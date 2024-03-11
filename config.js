require("dotenv").config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  dbUrl: process.env.DB_URL || "mongodb://localhost:27017/recipe-app",
};
