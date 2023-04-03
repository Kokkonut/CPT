const Organization = require("../models/Organization");
const User = require("../models/User");

exports.createOrganization = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    const newOrganization = new Organization({
      name,
      description,
      owner: userId,
    });

    const savedOrganization = await newOrganization.save();

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          organizations: {
            org: savedOrganization._id,
            role: "owner",
          },
        },
      },
      { new: true }
    );

    res.status(201).json(savedOrganization);
  } catch (error) {
    res.status(500).json(error);
  }
};
