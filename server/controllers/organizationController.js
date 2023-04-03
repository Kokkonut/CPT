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

exports.joinOrganization = async (req, res) => {
    try {
      const { orgName } = req.body;
      const organization = await Organization.findOne({ name: orgName });
  
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
  
      const joinRequest = {
        user: req.user.id,
        status: 'pending',
      };
  
      organization.joinRequests.push(joinRequest);
      await organization.save();
  
      res.status(200).json({ message: 'Join request sent' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  