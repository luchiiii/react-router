const mongoose = require("mongoose");
const { DB_URI } = require("../config/index");
const connectDb = async () => {
    await mongoose
    .connect(DB_URI)
    .then(() => console.log("Database is connected"))
    .catch((error) => console.log("Database connection failed"));
};
module.exports = connectDb;