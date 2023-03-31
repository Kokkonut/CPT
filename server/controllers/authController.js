const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/passport");
const User = require("../models/user");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signup = async (req, res) => {
  try {
    console.log('req', req)
    console.log('req.body', req.body)
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