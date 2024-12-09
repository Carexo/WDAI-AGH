require("dotenv").config();

const baseConfig = {
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: "100d",
  },
};

module.exports = baseConfig;
