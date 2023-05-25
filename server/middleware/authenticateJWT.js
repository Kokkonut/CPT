const jwt = require("jsonwebtoken");

exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).redirect("/login");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(401).redirect("/login");
    }

    req.user = decoded;
    next();
  });
};
