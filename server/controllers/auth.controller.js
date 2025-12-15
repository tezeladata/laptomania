const User = require("../models/user.model.js");
const AppError = require("../utils/appError.js");
const catchAsync = require("../utils/catchAsync.js");
const bcrypt = require("bcrypt")

const signUp = catchAsync(async (req, res, next) => {
    const {email, fullname, password} = req.body;
    const newUser = await User.create({email, fullname, password});
    res.status(201).json("User created successfully")
});

const logIn = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email}).select("+password");

    if (!user) {
        return next(new AppError("Invalid email or password", 401))
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
        return next(new AppError("Invalid email or password", 401))
    }

    user.password = undefined;

    res.status(200).json(user)
})

module.exports = {signUp, logIn}