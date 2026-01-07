const User = require("../models/user.model.js");
const AppError = require("../utils/appError.js");
const catchAsync = require("../utils/catchAsync.js");

const createSendToken = (user, statusCode, res) => {
    const token = user.signToken();

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    };

    user.password = undefined

    res.status(statusCode).cookie("lg", token, cookieOptions).json(user)
}

const signUp = catchAsync(async (req, res, next) => {
    const {email, fullname, password} = req.body;
    const newUser = await User.create({email, fullname, password});
    res.status(201).json({message: "User created successfully"})
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

    createSendToken(user, 200, res)
})

const logOut = catchAsync(async (req, res, next) => {
    res.clearCookie("lg");
    res.status(200).send();
})

module.exports = {signUp, logIn, logOut};