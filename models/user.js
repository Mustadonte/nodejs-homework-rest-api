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
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const signUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionList),
  avatarURL: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "any.required": "missing required field email",
  }),
});

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .messages({
      "any.required": "missing required subscription field",
    }),
});

const schemas = {
  signUpSchema,
  loginSchema,
  updateSubscription,
  verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
