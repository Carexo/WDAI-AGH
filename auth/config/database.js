const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bookstore", "root", "password", {
  dialect: "sqlite",
  host: "./auth_database.sqlite",
});

module.exports = sequelize;
