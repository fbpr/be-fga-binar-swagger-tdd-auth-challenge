const responseTemplate = require('../../../helpers/response.helper');
const { transactionPayloadSchema } = require('./schema');

const transactionValidator = (req, res, next) => {
  const { error } = transactionPayloadSchema.validate(req.body);
  if (error) {
    let responseError = responseTemplate(
      null,
      'invalid request',
      error.details[0].message,
      400
    );
    res.json(responseError);
    return;
  }
  next();
};

module.exports = transactionValidator;
