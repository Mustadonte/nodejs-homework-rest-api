const gravatar = require("gravatar");
const { User } = require("../../models/user");
const {
  RequestError,
  sendEmail,
  createVerificationEmail,
} = require("../../helpers");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const signUp = async (req, res) => {
  const { password, email, subscription, token } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    subscription,
    token,
    verificationToken,
  });
  const mail = createVerificationEmail(email, verificationToken);
  await sendEmail(mail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = signUp;
