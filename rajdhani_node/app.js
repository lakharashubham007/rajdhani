const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const ApiError = require("./utils/ApiError");
const helmet = require("helmet");
const public_routes = require('./routes/v1/public');
const publicRoutes = require('./routes/v1/public');
const privateRoutes = require('./routes/v1/private');


const app = express();
app.use(helmet());
//parse json request body
app.use(express.json());
//parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
//enable cors
app.use(cors());
app.options("*", cors());

//public routes for register
app.use("/v1", public_routes);

// Use public routes for /v1
app.use('/v1/public', publicRoutes); // Public routes

// Use private routes for /v1/private
app.use('/v1/private', privateRoutes); // Private routes

//Api routes
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;