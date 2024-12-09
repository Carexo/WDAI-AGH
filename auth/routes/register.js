const { newToken } = require("../utils/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const db = require("../models");
const createError = require("http-errors");

router.post("/", async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, "Email and password required"));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({ email, password: hashedPassword });
    const token = newToken(user);
    return res.status(201).send({ token, user_id: user.id });
  } catch (error) {
    return next(createError(400, error.message));
  }
});

module.exports = router;
