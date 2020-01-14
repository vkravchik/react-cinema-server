const jwt = require('jsonwebtoken');
const config = require('../cfg/key');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  let token;

  console.log(authHeader);

  if (authHeader) {
    token = authHeader.split(' ')[1];
  }

  console.log(token);

  if (token) {
    jwt.verify(token, config.tokenKey, (err, decoded) => {
      if (err) {
        res.status(401).json({
          error: 'Failed Authenticate'
        });
      } else {
        // Check if user exist in DB
      }
    });
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
};
