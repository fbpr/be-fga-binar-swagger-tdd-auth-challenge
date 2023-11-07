const Joi = require('joi');

const userPayloadSchema = Joi.object({
  name: Joi.string().alphanum().max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(8).required(),
  identity_type: Joi.string().required(),
  identity_id: Joi.string().required(),
  address: Joi.string().required(),
});

module.exports = { userPayloadSchema };
