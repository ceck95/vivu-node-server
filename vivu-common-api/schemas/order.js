const orderItem = require('./order-item');
const customerAddress = require('./customer-address');
const orderPayment = require('./order-payment');
const Joi = require('joi');

let response = Joi.object({
    orderStatus: Joi.number(),
    customerId: Joi.number().allow('', null),
    customerFullName: Joi.string().allow('', null),
    customerPhone: Joi.string().allow('', null),
    quoteId: Joi.number(),
    shippingAddressId: Joi.number(),
    subtotal: Joi.number(),
    shippingAmount: Joi.number(),
    grandTotal: Joi.number()
  }),
  responseItem = Joi.object({
    id: Joi.number(),
    orderStatus: Joi.number(),
    customerId: Joi.number().allow('', null),
    customerFullName: Joi.string().allow('', null),
    customerPhone: Joi.string().allow('', null),
    quoteId: Joi.number(),
    shippingAddressId: Joi.number(),
    subtotal: Joi.number(),
    shippingAmount: Joi.number(),
    grandTotal: Joi.number(),
    orderItems: Joi.array().items(orderItem.responseItem),
    address: customerAddress.response,
    orderPayment: orderPayment.response,
    createdAt: Joi.number(),
    code: Joi.string()
  });



module.exports = {
  response: response,
  responseItem: responseItem
};