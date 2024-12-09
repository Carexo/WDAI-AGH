const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.sequelize = sequelize;

// Import models
db.orders = require("./order")(sequelize);

module.exports = db;
