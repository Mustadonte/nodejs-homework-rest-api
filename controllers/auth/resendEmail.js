const { User } = require("../../models/user");
const {
  RequestError,
  createVerificationEmail,
  sendEmail,
} = require("../../helpers");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.verify) {
    throw RequestError(404, "Verification has already been passed");
  }

  const mail = createVerificationEmail(email, user.verificationToken);

  await sendEmail(mail);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendEmail;
