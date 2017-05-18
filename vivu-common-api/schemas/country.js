/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-21T12:33:22+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-21T12:35:51+07:00
 */

'use strict';

const Joi = require('joi');

let response = Joi.object({
  countryCode: Joi.string(),
  name: Joi.string()
});

module.exports = {
  response: response
};
