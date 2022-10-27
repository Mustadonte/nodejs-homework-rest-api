const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(id, { subscription });
  res.status(200).json("Subscription updated");
};

module.exports = updateSubscription;
