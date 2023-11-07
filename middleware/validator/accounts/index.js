const responseTemplate = require('../../../helpers/response.helper');
const { accountPayloadSchema } = require('./schema');

const accountValidator = (req, res, next) => {
  const { error } = accountPayloadSchema.validate(req.body);
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

module.exports = accountValidator;
