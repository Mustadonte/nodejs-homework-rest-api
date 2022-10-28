const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { page = 1, limit = 20, ...filter } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner: req.user.id, ...filter },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id email");
  res.json(result);
};

module.exports = getAll;
