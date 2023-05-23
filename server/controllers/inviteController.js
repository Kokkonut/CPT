const sendInvite = require('../services/inviteService');
const Invite = require('../models/Invite');

exports.inviteUser = async (req, res) => {
  const { email, organizationId } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Create the invite document
    const invite = new Invite({
      email: email,
      organization: organizationId,
    });
    await invite.save();

    await sendInvite(email, invite._id);

    return res.status(200).json({ message: "Invitation sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
