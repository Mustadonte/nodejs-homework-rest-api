const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const controller = require("../../controllers/users");
const { validateBody, auth, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.patch(
  "/",
  auth,
  validateBody(schemas.updateSubscription),
  ctrlWrapper(controller.updateSubscription)
);

router.get("/current", auth, ctrlWrapper(controller.getCurrent));

router.get("/logout", auth, ctrlWrapper(controller.logout));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(controller.updateAvatar)
);

module.exports = router;
