# Backend Documentation

## Project Structure

├── app.js
├── config
│ └── dbConnect.js
├── controllers
│ ├── recipeController.js
│ └── userController.js
├── models
│ ├── Recipe.js
│ └── User.js
└── routes
├── authRoutes.js
├── index.js
├── recipeRoute.js
└── userRoutes.js


## Description

This backend application is built using Node.js with MongoDB as the database. It provides endpoints for managing recipes and users.

## Files

- **app.js**: Entry point of the application.
- **config/dbConnect.js**: Configuration file for connecting to the MongoDB database.
- **controllers/recipeController.js**: Controller handling CRUD operations for recipes.
- **controllers/userController.js**: Controller handling CRUD operations for users.
- **models/Recipe.js**: Mongoose schema and model for the Recipe entity.
- **models/User.js**: Mongoose schema and model for the User entity.
- **routes/authRoutes.js**: Routes for user authentication.
- **routes/index.js**: Main router file where other route files are imported and configured.
- **routes/recipeRoute.js**: Routes for managing recipes.
- **routes/userRoutes.js**: Routes for managing users.

## Deployment

To deploy this backend application:

1. Make sure you have Node.js and MongoDB installed on your server.
2. Clone this repository to your server.
3. Install dependencies using `npm install`.
4. Configure the MongoDB connection in `config/dbConnect.js`.
5. Run the application using `node server.js`.

