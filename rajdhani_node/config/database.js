const mongoose = require("mongoose");
const config = require("./config");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
const connectDB = () => {
    mongoose.connect(config.mongoose.url)
        .then(() => console.log("Connected to DB at", config.mongoose.url))
        .catch((e) => console.log("Failed to connect to DB", config.mongoose.options));
}

module.exports = connectDB;