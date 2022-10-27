const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { RequestError } = require("../helpers");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (!token || bearer !== "Bearer") {
    throw RequestError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    if (!id) {
      throw RequestError(401, "Not authorized");
    }
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw RequestError(401, "Not authorized");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid signature") {
      error.status = 401;
      error.message = "Not authorized";
    }
    next(RequestError(error.status, error.message));
  }
};

module.exports = auth;
