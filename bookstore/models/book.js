const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Book extends Model {}

  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
      },
    },
    { sequelize, modelName: "book" },
  );

  return Book;
};
