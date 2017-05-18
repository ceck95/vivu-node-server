/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-23T15:21:54+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-27T16:34:42+07:00
 */


'use strict';

const Joi = require('joi');
const productColorSchema = require('./product-color');

let response = Joi.object({
    id: Joi.number(),
    name: Joi.string(),
    sku: Joi.string(),
    notes: Joi.string().allow([null, '']),
    details: Joi.string(),
    urlKey: Joi.string(),
    imagePath: Joi.string().allow([null, '']),
    basePrice: Joi.number(),
    isSoldOut: Joi.boolean(),
    categoryGroupId: Joi.number(),
    isProductColor: Joi.boolean(),
    categoryId: Joi.number()
  }),
  responseOne = Joi.object({
    id: Joi.number(),
    name: Joi.string(),
    sku: Joi.string(),
    notes: Joi.string().allow([null, '']),
    details: Joi.string(),
    urlKey: Joi.string(),
    imagePath: Joi.string().allow([null, '']),
    basePrice: Joi.number(),
    isSoldOut: Joi.boolean(),
    categoryGroupId: Joi.number(),
    categoryId: Joi.number(),
    isProductColor: Joi.boolean(),
    productColors: Joi.array().items(productColorSchema.response)
  }),
  responseOneForQuoteItem = Joi.object({
    id: Joi.number(),
    name: Joi.string(),
    sku: Joi.string(),
    notes: Joi.string().allow([null, '']),
    details: Joi.string(),
    urlKey: Joi.string(),
    imagePath: Joi.string().allow([null, '']),
    basePrice: Joi.number(),
    isSoldOut: Joi.boolean(),
    categoryGroupId: Joi.number(),
    categoryId: Joi.number(),
    isProductColor: Joi.boolean(),
    productColor: productColorSchema.responseOne
  });

module.exports = {
  response: response,
  responseOne: responseOne,
  responseOneForQuoteItem: responseOneForQuoteItem
};
