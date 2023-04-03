const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecret, (error, user) => {
    if (error) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    req.user = user;
    next();
  });
};
