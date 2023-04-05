const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/passport");
const User = require("../models/user");

//login
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
    //added manager flag to token
    const token = jwt.sign(
      { id: user.id, role: user.manager ? "manager" : "user" },
      jwtSecret,
      { expiresIn: "1d" }
    );
    //max age 24 hours for cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: isProduction ? "none" : undefined,
    });
    console.log("token", token);
    console.log('Set-Cookie:', res.get('Set-Cookie'));
    res.status(200).json({ message: "Login successful" });
    // res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//signup  
exports.signup = async (req, res) => {
  try {
    console.log("req", req);
    console.log("req.body", req.body);
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    res.status(200).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
