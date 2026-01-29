const express = require("express");
const { createCheckoutSession } = require("../controllers/payment.controller");
const protect = require("../middlewares/auth.middleware")

const paymentRouter = express.Router();

paymentRouter.post("/", protect, createCheckoutSession);

module.exports = {paymentRouter}