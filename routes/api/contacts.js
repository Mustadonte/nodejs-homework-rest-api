const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const controllers = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(controllers.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(controllers.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(controllers.add));

router.delete("/:contactId", isValidId, ctrlWrapper(controllers.removeById));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(controllers.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(controllers.updateStatusContact)
);

module.exports = router;
