const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", ctrlWrapper(controllers.getAll));

router.get("/:contactId", ctrlWrapper(controllers.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(controllers.add));

router.delete("/:contactId", ctrlWrapper(controllers.removeById));

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrlWrapper(controllers.updateById)
);

module.exports = router;
