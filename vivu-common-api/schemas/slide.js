const Joi = require('joi');

let responseItem = Joi.object({
  id: Joi.number(),
  image: Joi.string(),
  link: Joi.string().allow(['']),
  priority: Joi.number()
});

module.exports = {
  responseItem: responseItem
};