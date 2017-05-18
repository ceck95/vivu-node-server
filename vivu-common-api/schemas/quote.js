/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-20T16:34:09+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-21T16:51:57+07:00
 */



const Joi = require('joi');

let responseQuote = Joi.object({
    id: Joi.number(),
    orderId: Joi.number().allow(['', null]),
    subtotal: Joi.number().allow(['', null]),
    grandTotal: Joi.number().allow(['', null]),
    checkoutMedthod: Joi.string().allow(['', null]),
    customerId: Joi.number().allow(['', null]),
    customerAddressId: Joi.number().allow(['', null])
  }),
  requestQuote = Joi.object({
    customerAddressId: Joi.number(),
    checkoutMethod: Joi.string(),
    quoteId: Joi.number()
  });

module.exports = {
  response: responseQuote,
  request: requestQuote
};