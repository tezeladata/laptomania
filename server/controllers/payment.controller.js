const stripe = require("stripe")(process.env.STRIPE_SECRET);
const catchAsync = require("../utils/catchAsync");
const Laptop = require("../models/laptop.model.js")
const AppError = require("../utils/appError.js")

const createCheckoutSession = catchAsync(async (req, res, next) => {
    const products = await Laptop.find({_id: {$in: req.body}})

    if (!products){
        return next(new AppError("Products do not exist", 404))
    };

    const line_items = products.map(product => (
        {
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.brand + " " + product.model,
                    description: product.description
                },
                unit_amount: product.price * 100
            },
            quantity: 1
        }
    ));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        success_url: "http://localhost:5173/panel",
        cancel_url: "http://localhost:5173/"
    });

    res.json({url: session.url});
});

module.exports = {createCheckoutSession}