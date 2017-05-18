/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-26T20:14:24+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-26T22:00:29+07:00
 */

'use strict';

const Joi = require('joi');

let response = Joi.object({
  id: Joi.number(),
  name: Joi.string(),
  priority: Joi.number(),
  notes: Joi.string().allow(['']),
  urlKey: Joi.string()
});

module.exports = {
  response: response
};
