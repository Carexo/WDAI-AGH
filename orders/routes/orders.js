const express = require("express");
const router = express.Router();
const db = require("../models");
const createError = require("http-errors");

router.get("/:user_id", async function (req, res, next) {
  try {
    const { user_id } = req.params;
    console.log(user_id);
    const orders = await db.orders.findAll({
      where: { user_id },
    });

    res.status(200).send(orders);
  } catch (error) {
    next(createError(500, error.message));
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { quantity, book_id } = req.body;

    if (!quantity || !book_id) {
      return next(createError(400, "Quantity and book_id are required"));
    }

    const response = await fetch(`http://localhost:3000/api/books/${book_id}`);

    if (!response.ok) {
      return next(createError(404, `Book with id ${book_id} not found`));
    }

    const newOrder = await db.orders.create({
      user_id: req.user.id,
      quantity,
      book_id,
    });

    res.status(200).send(newOrder);
  } catch (error) {
    next(createError(500, error.message));
  }
});

router.delete("/:order_id", async function (req, res, next) {
  try {
    const { order_id } = req.params;

    const numberOfDeleteOrders = await db.orders.destroy({
      where: { id: order_id },
    });

    if (numberOfDeleteOrders === 0) {
      next(createError(404, `Book with id ${order_id} not found`));
      return;
    }

    res.status(200).send({ message: "Order deleted" });
  } catch (error) {
    next(createError(500, error.message));
  }
});

router.patch("/:order_id", async function (req, res, next) {
  try {
    const { order_id } = req.params;
    const { quantity } = req.body;

    if (!quantity) {
      return next(createError(400, "Quantity is required"));
    }

    const order = await db.orders.findByPk(order_id);

    if (!order) {
      next(createError(404, `Order with id ${order_id} not found`));
      return;
    }

    order.quantity = quantity;
    await order.save();

    res.status(200).send(order);
  } catch (error) {
    next(createError(500, error.message));
  }
});

module.exports = router;
