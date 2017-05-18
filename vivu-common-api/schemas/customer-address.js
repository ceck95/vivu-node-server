/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-20T11:20:15+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   root
 * @Last modified time: 2017-03-15T14:56:00+07:00
 */


'use strict';

const Joi = require('joi');

let requestRegisterCustomer = Joi.object({
    street: Joi.string(),
    provinceCode: Joi.string(),
    postalCode: Joi.string(),
    wardCode: Joi.string(),
    districtCode: Joi.string(),
    countryCode: Joi.string()
  }),
  response = Joi.object({
    id: Joi.number(),
    customerId: Joi.number().allow(['', null]),
    type: Joi.string(),
    fullName: Joi.string(),
    phone: Joi.string(),
    street: Joi.string(),
    postalCode: Joi.string().allow(['', null]),
    province: Joi.any(),
    countryCode: Joi.string().allow(['', null]),
    district: Joi.string(),
    ward: Joi.string(),
    customerName: Joi.string().allow([null, '']),
    isDefault: Joi.boolean().default(false)
  }),
  request = Joi.object({
    type: Joi.string(),
    phone: Joi.string(),
    street: Joi.string(),
    provinceCode: Joi.string(),
    postalCode: Joi.string(),
    districtCode: Joi.string(),
    countryCode: Joi.string(),
    wardCode: Joi.string(),
    customerName: Joi.string(),
    isDefault: Joi.boolean()
  });

module.exports = {
  requestCustomer: requestRegisterCustomer,
  response: response,
  request: request,
  responseItem: response
};