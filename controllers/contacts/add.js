const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const result = await Contact.create({ ...req.body, owner: req.user.id });
  res.status(201).json({
    result,
  });
};

module.exports = add;
