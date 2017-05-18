/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-18T09:55:16+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-24T08:59:15+07:00
 */



const Joi = require('joi');
const productColorPreviewImageSchema = require('./product-color-preview-image');

let response = Joi.object({
    id: Joi.number(),
    colorName: Joi.string().allow([null, '']),
    referProductImagePath: Joi.string().allow([null,'']),
    price: Joi.number(),
    priority: Joi.number(),
    isSoldOut: Joi.boolean(),
    productColorPreviewImages: Joi.array().items(productColorPreviewImageSchema.response)
  }),
  responseOne = Joi.object({
    id: Joi.number(),
    colorName: Joi.string().allow([null, '']),
    referProductImagePath: Joi.string().allow(null,''),
    price: Joi.number(),
    priority: Joi.number(),
    isSoldOut: Joi.boolean()
  });

module.exports = {
  response: response,
  responseOne: responseOne
};
