const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (token) {
    jwt.verify(token, secrets.jwt, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: 'Not Authorized' });
      } else {
        req.user = decodeToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Not Authorized' });
  }
};
