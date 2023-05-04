const console = require("console");
const Organization = require("../models/Organization");
const User = require("../models/User");

// @desc    Get all organizations
exports.createOrganization = async (req, res) => {
  try {
    console.log("START CREATE ORG");
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

// @desc Join organization
exports.joinOrganization = async (req, res) => {
  try {
    console.log('JOIN REQUEST BODY!!!!!!!!!!!!', req.body)
    const { orgName } = req.body;
    console.log('Join Request ORG NAME: ', { orgName })
    const userId = req.user.id;
    console.log('Join Request USER ID: ', userId)

    //regex to make search case insensitive
    const organization = await Organization.findOne({ name: { $regex: new RegExp(`^${orgName}$`, 'i') } });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already a member or has a pending request
    const isMember = user.organizations.some(
      (org) => org.org.toString() === organization.id
    );
    const hasPendingRequest = organization.joinRequests.some(
      (req) => req.user.toString() === userId && req.status === "pending"
    );

    if (isMember) {
      return res
        .status(400)
        .json({ message: "You are already a member of this organization" });
    }

    if (hasPendingRequest) {
      return res
        .status(400)
        .json({
          message:
            "You already have a pending join request for this organization",
        });
    }

    // Create the join request
    organization.joinRequests.push({ user: userId });
    await organization.save();

    res.status(200).json({ message: "Join request sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc manage join request
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

// @desc Detailed organization data
exports.getOrganizationData = async (req, res) => {
  try {
    console.log("START GET ORG DATA");
    const orgId = req.params.orgId;
    console.log("SERVER-orgId", orgId);
    const userId = req.user.id;
    console.log("SERVER-userId", userId);

    const organization = await Organization.findById(orgId);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userOrg = user.organizations.find(
      (org) => org.org.toString() === orgId
    );

    if (!userOrg) {
      return res.status(403).json({ message: "Access denied" });
    }

    const userRole = userOrg.role;

    res.status(200).json({ orgData: organization, userRole });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
