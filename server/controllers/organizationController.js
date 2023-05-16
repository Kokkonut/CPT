const console = require("console");
const Organization = require("../models/Organization");
const User = require("../models/User");

// @desc    Get all organizations
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

// @desc Join organization
exports.joinOrganization = async (req, res) => {
  try {
    const { orgName } = req.body;
    const userId = req.user.id;

    //regex to make search case insensitive
    const organization = await Organization.findOne({
      name: { $regex: new RegExp(`^${orgName}$`, "i") },
    });

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
      return res.status(400).json({
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

    if (!["accepted", "rejected"].includes(status)) {
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

    if (status === "accepted") {
      organization.employees.push(joinRequest.user);

      // Find the user who made the join request
      const user = await User.findById(joinRequest.user);

      // Add the organization to the user's organizations array with the role of "employee"
      user.organizations.push({ org: orgId, role: "employee" });

      // Delete the join request after it has been accepted or rejected
      organization.joinRequests.pull(requestId);


      // Save the updated user to the database
      await user.save();
    }

    await organization.save();

    res.status(200).json({ message: "Join request updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get organization users
exports.getOrganizationUsers = async (req, res) => {
  try {
    const { orgId } = req.params; // use req.params if orgId is a URL parameter

    const organization = await Organization.findById(orgId)
      .populate("employees")
      .populate("owner")
      .populate("supervisors")
      .populate("joinRequests.user");

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res
      .status(200)
      .json({
        users: organization.employees,
        owner: organization.owner,
        supervisors: organization.supervisors,
        joinRequests: organization.joinRequests,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Detailed organization data NOT USED CUURENTLY
exports.getOrganizationData = async (req, res) => {
  try {
    const orgId = req.params.orgId;
    const userId = req.user.id;

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
