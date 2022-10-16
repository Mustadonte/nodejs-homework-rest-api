const Joi = require("Joi");

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
});

module.exports = {
  addSchema,
};
