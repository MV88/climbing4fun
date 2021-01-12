const express = require("express");
const yup = require("yup");
const AuthUtils = require('../../utils/AuthUtils');
const User = require('../users/users.model');
const router = express.Router();

const userSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2)
    .required(),
  surname: yup
    .string()
    .trim()
    .min(2)
    .required(),
  email: yup
    .string()
    .trim()
    .email()
    .required(),
  password: yup
    .string()
    .min(8, "password must be at least 8 characters")
    .max(100)
    .matches(/[^a-zA-Z0-9]/, "password must contain a special character")
    .matches(/[a-z]/, "password must contain an upper case letter")
    .matches(/[A-Z]/, "password must contain a lower case letter")
    .matches(/[0-9]/, "password must contain a number")
    .required(),
});

router.post("/signup", async (req, res, next) => {
  try {
    const { email, name, password, surname } = req.body;
    const newUser = { email, name, password, surname };
    await userSchema.validate(newUser, { abortEarly: false });
    const existingUser = await User.query().where({ email }).first();
    if (existingUser) {
      const error = new Error("Email already in use");
      res.status(403);
      throw error;
    }
    const hashedPassword = await AuthUtils.hashPassword(password);
    const insertedUser = await User.query().insert({ name, surname, email, password: hashedPassword });
    delete insertedUser.password;
    const payload = {
      email,
      id: insertedUser.id,
      name,
      surname,
    };
    const token = await AuthUtils.sign(payload);
    res.json({
      message: "ok",
      user: insertedUser,
      token,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const { email, password, name = "used for validation", surname = "used for validation" } = req.body;
    const loggingUser = { email, password, name, surname };
    await userSchema.validate(loggingUser, { abortEarly: false });
    const existingUser = await User.query().where({ email }).first();
    console.log("existingUser", existingUser);
    if (!existingUser) {
      return AuthUtils.authFailed(res);
    }
    const isValidPassword = await AuthUtils.comparePasswords(existingUser.password, password);
    console.log("isValidPassword", isValidPassword);

    if (!isValidPassword) {
      return AuthUtils.authFailed(res);
    }
    const payload = {
      email,
      id: existingUser.id,
      name: existingUser.name,
      surname: existingUser.surname,
    };
    const token = await AuthUtils.sign(payload);
    res.json({
      message: "ok",
      user: existingUser,
      token,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
