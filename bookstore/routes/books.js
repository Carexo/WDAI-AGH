const express = require("express");
const router = express.Router();
const db = require("../models");
const createError = require("http-errors");

router.get("/", async function (req, res, next) {
  try {
    const books = await db.book.findAll({
      attributes: ["id", "title", "author", "year"],
    });

    res.status(200).send(books);
  } catch (error) {
    next(createError(500, error.message));
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { title, author, year } = req.body;

    if (!title || !author) {
      return next(createError(400, "Title and author are required"));
    }

    const newBook = await db.book.create({ title, author, year });

    res.status(200).send(newBook);
  } catch (error) {
    next(createError(500, error.message));
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const book = await db.book.findByPk(id, {
      attributes: ["id", "title", "author", "year"],
    });

    if (!book) {
      next(createError(404, `Book with id ${id} not found`));
      return;
    }

    res.status(200).send(book);
  } catch (error) {
    next(createError(500, error.message));
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const numberOfDeleteBooks = await db.book.destroy({ where: { id } });

    if (numberOfDeleteBooks === 0) {
      next(createError(404, `Book with id ${id} not found`));
      return;
    }

    res.status(200).send({ message: "Book deleted" });
  } catch (error) {
    next(createError(500, error.message));
  }
});

module.exports = router;
