/**
 * @Author: Tran Van Nhut <nhutdev>
 * @Date:   2017-02-10T16:38:23+07:00
 * @Email:  tranvannhut4495@gmail.com
* @Last modified by:   nhutdev
* @Last modified time: 2017-02-21T14:11:15+07:00
 */



const Joi = require('joi');
const customerAddress = require('./customer-address');

let registerRequest = Joi.object({
    email: Joi.string().email(),
    phone: Joi.string().regex(/^[0-9]{10,15}$/),
    gender: Joi.string().valid(['male', 'female']).default('male'),
    fullName: Joi.string(),
    dob: Joi.number(),
    password: Joi.string().min(5).max(255),
    address: customerAddress.requestCustomer
  }),
  response = Joi.object({
    email: Joi.string(),
    phone: Joi.string().regex(/^[0-9]{10,15}$/),
    gender: Joi.string().valid(['male', 'female']).default('male'),
    fullName: Joi.string(),
    dob: Joi.number(),
    address: customerAddress.response
  }),
  loginRequest = Joi.object({
    login: Joi.string(),
    password: Joi.string().min(5).max(255)
  }),
  changePasswordRequest = Joi.object({
    passwordOld: Joi.string(),
    passwordNew: Joi.string()
  }),
  forgotPasswordRequest = Joi.object({
    login: Joi.string()
  }),
  request = Joi.object({
    phone: Joi.string(),
    dob: Joi.number(),
    gender: Joi.string().valid(['male', 'female']).default('male'),
    passwordOld: Joi.any(),
    passwordNew: Joi.any(),
    fullName: Joi.string()
  });

module.exports = {
  registerRequest: registerRequest,
  response: response,
  loginRequest: loginRequest,
  forgotPasswordRequest: forgotPasswordRequest,
  changePasswordRequest: changePasswordRequest,
  request: request
};
