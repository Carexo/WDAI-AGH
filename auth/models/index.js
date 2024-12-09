const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

db.sequelize = sequelize;

// Import models
db.user = require("./user")(sequelize);

module.exports = db;
