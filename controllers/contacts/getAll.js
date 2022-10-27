const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { page = 1, limit = 20, favorite = true } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    { owner: req.user.id, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id email");
  res.json(result);
};

module.exports = getAll;
