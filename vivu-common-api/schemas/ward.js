/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-23T15:21:54+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-03-12T23:38:47+07:00
 */


'use strict';

const Joi = require('joi');

let response = Joi.object({
  provinceCode: Joi.string(),
  countryCode: Joi.string(),
  districtCode: Joi.string(),
  wardCode: Joi.string(),
  displayName: Joi.string()
});

module.exports = {
  response: response
}
