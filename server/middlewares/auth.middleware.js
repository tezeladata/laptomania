const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError.js");
const User = require("../models/user.model.js");
const catchAsync = require("../utils/catchAsync");

const protect = catchAsync(async (req, res, next) => {
    const token = req.cookies.lg;

    if  (!token) {
        return next(new AppError("You are not logged in! Please log in to get accsess", 401))
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user){
        return next(new AppError("User does not exist with this token anymore", 401))
    }

    req.user = user;
    next()
});

module.exports = protect;