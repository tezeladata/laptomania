const express = require("express");

// controllers
const { signUp, logIn } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/login", logIn)

module.exports = authRouter