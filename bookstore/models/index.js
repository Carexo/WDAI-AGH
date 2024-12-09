const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.sequelize = sequelize;

// Import models
db.book = require("./book")(sequelize);

module.exports = db;
