const contacts = require("../../models/contacts");
const RequestError = require("../../helpers");
const { addSchema } = require("../../schemas/contacts");

const add = async (req, res) => {
  const body = req.body;
  const { error } = addSchema.validate(body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await contacts.addContact(body);
  res.status(201).json({
    result,
  });
};

module.exports = add;
