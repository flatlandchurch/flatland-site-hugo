const jwt = require('jsonwebtoken');
const got = require('got');
const catchify = require('catchify');

const SECRET = process.env.SECRET;
const KEY = process.env.KEY;

const safeVerify = (token, secret) => {
  try {
    return [null, jwt.verify(token, secret)];
  } catch(e) {
    return [e, null];
  }
};

// */5 * * * *
exports.handler = async function(event, context) {
  const { token } = event.queryStringParameters;

  const [err, data] = safeVerify(token, SECRET);

  if (err) {
    return {};
  }

  if (!data.key || data.key !== KEY) {
    return {};
  }

  return {};
};
