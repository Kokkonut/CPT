const jwt = require("jsonwebtoken");

exports.authenticateJWT = (req, res, next) => {
  // Read the token from the cookie instead of the header
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
