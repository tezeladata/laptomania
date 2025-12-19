const AppError = require("../utils/appError.js")

const allowedTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You do not have permission!", 401))
        }

        next()
    } 
};

module.exports = allowedTo;