const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const globalErrorHandler = require("./controllers/error.controller");
const path = require("path");

// routers
const laptopRouter = require("./routers/laptop.router");
const authRouter = require("./routers/auth.router");

dotenv.config()

const app = express();

// middlewares
app.use(cors())
app.use(express.json())

// app.use("/laptops/images", express.static(path.join(__dirname, "uploads/laptops")))

// using routers
app.use("/api/laptops", laptopRouter);
app.use("/api/auth", authRouter)

// global error handler
app.use(globalErrorHandler)

// connect to db
mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log("connected to database")
        app.listen(3000, () => {
            console.log("server is running on port 3000")
        })
    })