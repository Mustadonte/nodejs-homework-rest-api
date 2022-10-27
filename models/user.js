const { Schema, model } = require("mongoose");
const Joi = require("Joi");
const { handleSaveErrors } = require("../helpers");

const emailRegex = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
const subscriptionList = ["starter", "pro", "business"];
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Password is required"],
      default: "123444",
    },

    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const signUp = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .messages({
      "any.required": "missing required subscription field",
    }),
});

const schemas = {
  signUp,
  loginSchema,
  updateSubscription,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
