const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bookstore", "root", "password", {
  dialect: "sqlite",
  host: "./bookstore_database.sqlite",
});

module.exports = sequelize;
