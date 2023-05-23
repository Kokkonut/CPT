const nodemailer = require('nodemailer');



const sendInvite = async (email, inviteId) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'mesh.app.invite@gmail.com', 
      pass: 'Thunder1969'
    }
  });

  let mailOptions = {
    from: 'mesh.app.invite@gmail.com', 
    to: email,
    subject: 'You are invited!',
    html: `
      <p>You have been invited to join our platform.</p>
      <p>Please click on the following link to join:</p>
      <a href="http://your-app.com/signup?invite_id=${inviteId}">Join</a>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Invite sent to ${email}`);
  } catch (error) {
    console.error(`Failed to send invite: ${error}`);
  }
}

module.exports = sendInvite;
