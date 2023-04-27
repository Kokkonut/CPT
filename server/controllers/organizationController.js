const Organization = require("../models/Organization");
const User = require("../models/User");

exports.createOrganization = async (req, res) => {
  try {
    console.log('START CREATE ORG');
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
  

  exports.updateJoinRequest = async (req, res) => {
    try {
      const { orgId, requestId, status } = req.body;
  
      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }
  
      const organization = await Organization.findById(orgId);
  
      if (!organization) {
        return res.status(404).json({ message: "Organization not found" });
      }
  
      const joinRequest = organization.joinRequests.id(requestId);
  
      if (!joinRequest) {
        return res.status(404).json({ message: "Join request not found" });
      }
  
      joinRequest.status = status;
  
      if (status === "approved") {
        organization.employees.push(joinRequest.user);
  
        // Find the user who made the join request
        const user = await User.findById(joinRequest.user);
  
        // Add the organization to the user's organizations array with the role of "employee"
        user.organizations.push({ org: orgId, role: "employee" });
  
        // Save the updated user to the database
        await user.save();
      }
  
      await organization.save();
  
      res.status(200).json({ message: "Join request updated successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  