const responseTemplate = (data, message, error, status) => {
  return {
    data,
    message,
    error,
    status,
  };
};

module.exports = responseTemplate;
