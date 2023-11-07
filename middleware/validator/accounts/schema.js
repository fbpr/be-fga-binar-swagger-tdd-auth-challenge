const Joi = require('joi');

const accountPayloadSchema = Joi.object({
  user_id: Joi.number().required(),
  bank_name: Joi.string().required(),
  bank_account_number: Joi.number().required(),
  balance: Joi.number().required(),
});

module.exports = { accountPayloadSchema };
