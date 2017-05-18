const helpers = require('node-helpers');
const orderTypes = require('../gen-nodejs/order_types');

const CustomerAddress = require('./customer-address');
const OrderPayment = require('./order-payment');


class Order extends helpers.models.Base {

  get tableName() {
    return 'sales_order';
  }

  constructor(data, opts) {

    opts = opts || {};
    super(data, opts);

    this.id = null;
    this.orderStatus = null;
    this.customerId = null;
    this.customerFullName = '';
    this.customerPhone = '';
    this.quoteId = null;
    this.shippingAddressId = null;
    this.shippingAmount = null;
    this.subtotal = null;
    this.grandTotal = null;
    this.code = '';

    if (data) {
      helpers.Model.assignData(this, data, opts);

      let address = new CustomerAddress(),
        orderPayment = new OrderPayment;
      if (data.address) {
        this.address = data.address.getAttributes ? data.address : new CustomerAddress(data.address);
      } else if (opts.includes ? opts.includes.indexOf(address.tableAlias) > -1 : false) {
        this.address = new CustomerAddress(data, {
          prefix: address.tableAlias
        });
      }

      if (data.orderPayment) {
        this.orderPayment = data.orderPayment.getAttributes ? data.orderPayment : new OrderPayment(data.orderPayment);
      } else if (opts.includes ? opts.includes.indexOf(orderPayment.tableAlias) > -1 : false) {
        this.orderPayment = new OrderPayment(data, {
          prefix: orderPayment.tableAlias
        });
      }

    }

  }

  getAttributes() {

    return {
      id: this.id,
      order_status: this.orderStatus,
      customer_id: this.customerId,
      customer_full_name: this.customerFullName,
      customer_phone: this.customerPhone,
      quote_id: this.quoteId,
      shipping_address_id: this.shippingAddressId,
      shipping_amount: this.shippingAmount,
      subtotal: this.subtotal,
      grand_total: this.grandTotal,
      status: this.status,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      created_by: this.createdBy,
      updated_by: this.updatedBy,
      code: this.code
    };

  }

  toThriftObject(opts) {

    let model = new orderTypes.Order();
    this.applyThrift(model, opts);
    if (this.address) {
      model.address = this.address.toThriftObject();
    }
    if (this.orderPayment) {
      model.orderPayment = this.orderPayment.toThriftObject();
    }
    return model;

  }

  // applyThrift(model, opts) {
  //   super.applyThrift(model, opts);
  // }

  toThriftInsert(opts) {

    let model = new orderTypes.OrderInsert();
    this.applyThrift(model, opts);
    return model;

  }

  toThriftForm(opts) {

    let model = new orderTypes.OrderForm();
    this.applyThrift(model, opts);
    return model;

  }

  responseObject(opts) {

    opts = opts || {};
    let result = helpers.Model.toObject(this, opts);
    if (helpers.Model.checkAvailableKey('createdAt', opts)) {
      result.createdAt = helpers.Data.toTimestamp(this.createdAt);
    }
    return result;

  }

  get serviceActions() {
    return ['getManyByCustomer'];
  }

}

module.exports = Order;