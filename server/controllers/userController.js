const User = require("../models/User");

exports.getUserData = async (req, res) => {
  
  try {
    console.log("User in getUserData:", req.user);
    console.log("User ID in getUserData:", req.user._id);
    console.log('REQ', req.user.id);
    const user = await User.findById(req.user.id).populate("organizations.org");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
