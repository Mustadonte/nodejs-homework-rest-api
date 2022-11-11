const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const controller = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

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

router.get("/verify/:verificationToken", ctrlWrapper(controller.verify));

router.post(
  "./verify",
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(controller.resendEmail)
);

module.exports = router;
