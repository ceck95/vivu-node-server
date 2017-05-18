/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-23T15:21:54+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-13T12:04:04+07:00
 */


'use strict';

const Joi = require('joi');
const wardSchema = require('./ward');

let responseMany = Joi.object({
    provinceCode: Joi.string(),
    countryCode: Joi.string(),
    districtCode: Joi.string(),
    displayName: Joi.string(),
    wards: Joi.array().items(wardSchema.response)
  }),
  response = Joi.object({
    provinceCode: Joi.string(),
    countryCode: Joi.string(),
    districtCode: Joi.string(),
    displayName: Joi.string()
  });

module.exports = {
  responseMany: responseMany,
  response: response
}
