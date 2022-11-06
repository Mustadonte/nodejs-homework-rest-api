const { BASE_URL, PORT } = process.env;

const createVerificationEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Verify email",
    test: "To verify your email click below",
    html: `<a target="_blank" href="${BASE_URL}:${PORT}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };

  return mail;
};

module.exports = createVerificationEmail;
