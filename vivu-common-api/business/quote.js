const helpers = require('node-helpers');
const optionTypes = helpers.ttypes.options;
const orderStatus = require('../resources/default').order.status;

class QuoteBusiness {

  static cashOnDelivery(request, reply, quoteId, checkoutMethod) {
    let quoteStore = request.dataStore.getStore('Quote'),
      quoteItemStore = request.dataStore.getStore('QuoteItem'),
      quotePaymentStore = request.dataStore.getStore('QuotePayment'),
      productStore = request.dataStore.getStore('Product'),
      form = request.payload.data,
      profile = request.auth.credentials.profile;

    return quoteStore.getOneByPk(quoteId).then(respQuote => {
      let modelQuote = quoteStore.createModel(respQuote);
      if (respQuote.orderId) {
        return reply(request.errorManager.translate({
          code: '506',
          source: 'check order quote'
        })).code(400);
      }
      let selectOptions = new optionTypes.SelectOptions();
      selectOptions.includes = [productStore.tableAlias];

      return quoteItemStore.getManyByQuote(quoteId, selectOptions).then(respListQuoteItem => {


        if (respListQuoteItem.length === 0) {
          return reply(request.errorManager.translate({
            code: '505',
            source: 'get many quote item'
          })).code(400);
        }

        for (let e of respListQuoteItem) {
          if (e.product.isSoldOut) {
            return reply(request.errorManager.translate({
              code: '511',
              source: 'product sold out',
              params:{
                '{{name}}':e.product.name
              }
            })).code(400);
          }
        }

        let subtotal = 0;
        respListQuoteItem.forEach(e => {
          subtotal += e.quantity * e.basePrice;
        });

        modelQuote.subtotal = subtotal;
        modelQuote.grandTotal = subtotal;
        modelQuote.customerAddressId = form.customerAddressId;
        if (profile) {
          modelQuote.customerId = profile.id;
        }
        modelQuote.checkoutMethod = checkoutMethod;


        let modelQuotePayment = quotePaymentStore.createModel({
          quoteId: respQuote.id,
          method: checkoutMethod
        });
        return quotePaymentStore.insertOne(modelQuotePayment).then(respQuotePayment => {

          return QuoteBusiness.assignDataQuoteToOrder(request, reply, respListQuoteItem, modelQuote, respQuotePayment);

        }).catch(err => {
          return helpers.HAPI.replyError(request, reply, err, {
            log: ['errors', 'insert quote payment']
          });
        });

      }).catch(err => {
        return helpers.HAPI.replyError(request, reply, err, {
          log: ['errors', 'get many quote']
        });
      });
    }).catch(err => {
      return helpers.HAPI.replyError(request, reply, err, {
        log: ['errors', 'get quote']
      });
    });
  }

  static assignDataQuoteToOrder(request, reply, respListQuoteItem, modelQuote, respQuotePayment) {

    let orderStore = request.dataStore.getStore('Order'),
      orderItemStore = request.dataStore.getStore('OrderItem'),
      orderPaymentStore = request.dataStore.getStore('OrderPayment'),
      quoteStore = request.dataStore.getStore('Quote'),
      profile = request.auth.credentials.profile,
      modelOrder = orderStore.createModel({
        orderStatus: orderStatus.new,
        customerId: modelQuote.customerId,
        quoteId: modelQuote.id,
        shippingAddressId: modelQuote.customerAddressId,
        subtotal: modelQuote.subtotal,
        grandTotal: modelQuote.subtotal,
        shippingAmount: 0,
        customerFullName: profile ? profile.fullName : '',
        customerPhone: profile ? profile.phone : ''
      });

    return orderStore.insertOne(modelOrder).then(respOrder => {

      modelQuote.orderId = respOrder.id;
      return quoteStore.updateOne(modelQuote, new optionTypes.SelectOptions()).then(() => {

        let listOrderItem = [];
        respListQuoteItem.forEach(e => {
          e.orderId = respOrder.id;
          e.quoteItemId = e.id;
          listOrderItem.push(orderItemStore.createModel(e));
        });

        return orderItemStore.insertMany(listOrderItem).then(() => {

          let modelOrderPayment = orderPaymentStore.createModel({
            orderId: respOrder.id,
            method: respQuotePayment.method
          });

          return orderPaymentStore.insertOne(modelOrderPayment).then(() => {
            return orderStore.createModel(respOrder);
          }).catch(err => {
            return helpers.HAPI.replyError(request, reply, err, {
              log: ['errors', 'insert order']
            });
          });

        }).catch(err => {
          return helpers.HAPI.replyError(request, reply, err, {
            log: ['errors', 'insert item order']
          });
        });

      }).catch(err => {
        return helpers.HAPI.replyError(request, reply, err, {
          log: ['errors', 'update quote']
        });
      });

    }).catch(err => {
      return helpers.HAPI.replyError(request, reply, err, {
        log: ['errors', 'insert order']
      });
    });

  }

}

module.exports = QuoteBusiness;