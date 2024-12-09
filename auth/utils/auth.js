const config = require("../config");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  let token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).end();
  }

  try {
    req.user = await verifyToken(token);

    next();
  } catch (e) {
    console.error(e);
    return res.status(401).end();
  }
};

module.exports = { newToken, verifyToken, protect };
