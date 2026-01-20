const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const globalErrorHandler = require("./controllers/error.controller");
const cookieParser = require("cookie-parser");

// Cybersecurity
const rateLimiter = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

// routers
const laptopRouter = require("./routers/laptop.router");
const authRouter = require("./routers/auth.router");

dotenv.config()

const app = express()

// Cybersecurity
app.use(rateLimiter({
    windowMs: 1000,
    max: 100
}))
app.use(mongoSanitize);
app.use(helmet);

app.get("/api/status", (req, res) => {
    res.json({status: "Server is running"})
})

// middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

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