/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-20T16:34:09+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-22T11:13:22+07:00
 */



const Joi = require('joi');

let response = Joi.object({
  id: Joi.number(),
  orderId: Joi.number(),
  method: Joi.string()
});

module.exports = {
  response: response
};
