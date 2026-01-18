const User = require("../models/user.model.js");
const AppError = require("../utils/appError.js");
const catchAsync = require("../utils/catchAsync.js");
const sendEmail = require("../utils/email.js");

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

    const code = newUser.createEmailVerificationToken();
    await newUser.save({ validateBeforeSave: false });

    const url = `${req.protocol}://${req.get("host")}/api/auth/verify/${code}`;

    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Verify Your Email - Laptomania</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #eef1f5;
                    font-family: 'Segoe UI', Roboto, Arial, Helvetica, sans-serif;
                }

                .wrapper {
                    padding: 40px 16px;
                }

                .container {
                    max-width: 680px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 14px;
                    overflow: hidden;
                    box-shadow: 0 12px 30px rgba(0,0,0,0.12);
                }

                .header {
                    background: linear-gradient(135deg, #0d6efd, #0b5ed7);
                    color: #ffffff;
                    padding: 48px 32px;
                    text-align: center;
                }

                .brand {
                    font-size: 28px;
                    font-weight: 800;
                    letter-spacing: 1px;
                    margin-bottom: 12px;
                }

                .headline {
                    font-size: 22px;
                    font-weight: 600;
                    margin: 0;
                }

                .content {
                    padding: 40px 40px 24px;
                    color: #2b2f33;
                    line-height: 1.7;
                    font-size: 16px;
                }

                .content p {
                    margin: 0 0 18px;
                }

                .highlight {
                    background-color: #f5f8ff;
                    border-left: 4px solid #0d6efd;
                    padding: 16px 18px;
                    border-radius: 6px;
                    margin: 24px 0;
                    font-size: 15px;
                }

                .cta-wrapper {
                    text-align: center;
                    margin: 36px 0;
                }

                .button {
                    display: inline-block;
                    padding: 16px 36px;
                    background: linear-gradient(135deg, #0d6efd, #0b5ed7);
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 700;
                    letter-spacing: 0.4px;
                    box-shadow: 0 8px 18px rgba(13,110,253,0.35);
                }

                .button:hover {
                    opacity: 0.95;
                }

                .link-box {
                    background-color: #f9fafb;
                    padding: 16px;
                    border-radius: 8px;
                    font-size: 14px;
                    word-break: break-all;
                    color: #0d6efd;
                }

                .footer {
                    background-color: #0f172a;
                    color: #cbd5e1;
                    padding: 28px 32px;
                    text-align: center;
                    font-size: 13px;
                }

                .footer strong {
                    color: #ffffff;
                }

                .footer p {
                    margin: 6px 0;
                }
            </style>
        </head>
        <body>
            <div class="wrapper">
                <div class="container">

                    <div class="header">
                        <div class="brand">LAPTOMANIA</div>
                        <h1 class="headline">Verify Your Email Address</h1>
                    </div>

                    <div class="content">
                        <p>Hi <strong>${fullname}</strong>,</p>

                        <p>
                            Welcome to <strong>Laptomania</strong> — your trusted destination for laptops,
                            accessories, and cutting-edge tech.
                        </p>

                        <p>
                            To activate your account and secure your access, please verify your email
                            address by clicking the button below.
                        </p>

                        <div class="cta-wrapper">
                            <a href="${url}" class="button">Verify My Email</a>
                        </div>

                        <div class="highlight">
                            🔐 <strong>Security notice:</strong>  
                            This verification link is time-limited and can only be used once.
                        </div>

                        <p>
                            If the button above doesn’t work, copy and paste the link below into your browser:
                        </p>

                        <div class="link-box">${url}</div>

                        <p style="margin-top: 28px;">
                            If you did not create a Laptomania account, you can safely ignore this email.
                        </p>

                        <p>
                            Cheers,<br/>
                            <strong>The Laptomania Team</strong>
                        </p>
                    </div>

                    <div class="footer">
                        <p><strong>Laptomania</strong> — Smart Tech. Smart Choices.</p>
                        <p>&copy; ${new Date().getFullYear()} Laptomania. All rights reserved.</p>
                    </div>

                </div>
            </div>
        </body>
        </html>
    `;

    try {
        await sendEmail({
            to: newUser.email,
            subject: "Welcome to Laptomania - verify your email address",
            html
        })

        res.status(201).json({message: "User created successfully"})
    } catch(e) {
        console.log(e)
    }
});

const verify = catchAsync(async (req, res, next) => {
    const {code} = req.params;

    const user = await User.findOne({verificationCode: code})

    if(!user){
        return next(new AppError("Invalid or expired verification code", 400))
    }

    user.isVerified = true;
    user.verificationCode = undefined;

    await user.save({validateBeforeSave: false});

    res.status(200).json("Email verified successfully")
})

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

module.exports = {signUp, logIn, logOut, verify};