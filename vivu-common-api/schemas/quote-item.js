/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-20T16:34:09+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T11:13:22+07:00
 */



const Joi = require('joi');
const productSchema = require('./product');

let responseQuoteItem = Joi.object({
    id: Joi.number(),
    quoteId: Joi.number().allow(['', null]),
    quantity: Joi.number().allow(['', null]),
    basePrice: Joi.number().allow(['', null]),
    product: productSchema.responseOneForQuoteItem
  }),
  requestQuoteITem = Joi.object({
    quantity: Joi.number().min(1),
    productId: Joi.number(),
    selectedProductColorId: Joi.number()
  });

module.exports = {
  response: responseQuoteItem,
  request: requestQuoteITem
};
