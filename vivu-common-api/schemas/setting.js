/**
 * @Author: Tran Van Nhut (nhutdev) 
 * @Date: 2017-05-23 16:46:09 
 * @Email:  tranvannhut4495@gmail.com 
 * @Last modified by:   nhutdev 
 * @Last modified time: 2017-05-23 16:46:09 
 */
const Joi = require('joi');

let response = Joi.object({
  appName: Joi.string()
});

module.exports = {
  response: response
};