const responseTemplate = require('../../../helpers/response.helper');
const { userPayloadSchema } = require('./schema');

const userValidator = (req, res, next) => {
  const { error } = userPayloadSchema.validate(req.body);
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

module.exports = userValidator;
