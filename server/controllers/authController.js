const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/passport");
const User = require("../models/user");

exports.loginUser = async (req, res) => {
  const token = jwt.sign({ id: req.user.id }, jwtSecret, { expiresIn: "1d" });
  res.json({ token });
};

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    res.status(200).json({ message: "User created" });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};