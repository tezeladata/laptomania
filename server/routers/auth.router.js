const express = require("express");

// controllers
const { signUp, logIn, logOut} = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/login", logIn)
authRouter.post("/logout", logOut);

authRouter.post("/auto-login", protect, async (req, res, next) => {
    res.status(200).json(req.user)
})

module.exports = authRouter