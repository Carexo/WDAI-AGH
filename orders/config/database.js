const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bookstore", "root", "password", {
  dialect: "sqlite",
  host: "./orders_database.sqlite",
});

module.exports = sequelize;
