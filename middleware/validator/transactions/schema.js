const Joi = require('joi');

const transactionPayloadSchema = Joi.object({
  source_account_id: Joi.number().required(),
  destination_account_id: Joi.number().required(),
  amount: Joi.number().required(),
});

module.exports = { transactionPayloadSchema };
