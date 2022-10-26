const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const controller = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(controller.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(controller.login)
);

module.exports = router;
