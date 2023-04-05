const User = require("../models/User");

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("organizations.org");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
