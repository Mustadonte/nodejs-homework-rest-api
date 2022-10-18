const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require("Joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: [
        /^\d{3} \d{3}-\d{4}$/,
        "Set number in correct format: '063 555-5555'",
      ],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSaveErrors);

const addSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required().messages({
    "string.base": `"" should be a type of string`,
    "string.empty": `"" must contain value`,
    "string.pattern.base": `"" must be 10 digit number`,
    "any.required": "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    "string.base": `"" should be a type of string`,
    "string.empty": `"" must contain value`,
    "string.pattern.base": `"" must be 10 digit number`,
    "any.required": "missing required email field",
  }),
  phone: Joi.string().min(7).required().messages({
    "string.base": `"" should be a type of string`,
    "string.empty": `"" must contain value`,
    "string.pattern.base": `"" must be 7 digit number`,
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
