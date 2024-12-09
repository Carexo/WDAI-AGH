const { newToken } = require("../utils/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const db = require("../models");
const createError = require("http-errors");

router.post("/", async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    next(createError(400, "Email and password required"));
    return;
  }

  const user = await db.user.findOne({ where: { email: email } });

  if (!user) {
    next(createError(401, "User doesn't exist"));
    return;
  }
  try {
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      next(createError(401, "Password is incorrect"));
      return;
    }

    const token = newToken(user);
    return res.status(201).send({ token, id: user.id });
  } catch (error) {
    next(createError(400, error.message));
  }
});

module.exports = router;
