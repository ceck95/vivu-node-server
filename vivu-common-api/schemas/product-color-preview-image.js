/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-03-18T10:06:57+07:00
 * @Email:  tranvannhut4495@gmail.com
 * @Last modified by:   nhutdev
 * @Last modified time: 2017-03-18T12:55:01+07:00
 */



const Joi = require('joi');

let response = Joi.object({
  imagePath: Joi.string()
});

module.exports = {
  response: response
};
