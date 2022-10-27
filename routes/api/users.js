const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const controller = require("../../controllers/users");
const { validateBody, auth } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.patch(
  "/",
  auth,
  validateBody(schemas.updateSubscription),
  ctrlWrapper(controller.updateSubscription)
);

router.post(
  "/signup",
  validateBody(schemas.signUpSchema),
  ctrlWrapper(controller.signUp)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(controller.login)
);

router.get("/current", auth, ctrlWrapper(controller.getCurrent));

router.get("/logout", auth, ctrlWrapper(controller.logout));

module.exports = router;
