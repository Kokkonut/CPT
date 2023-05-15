const jwt = require("jsonwebtoken");

exports.authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;


  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }


    req.user = decoded;
    next();
  });
};
