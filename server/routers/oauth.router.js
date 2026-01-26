const express = require("express");
const { googleCallback, getGoogleAuthUrl, getFacebookAuthUrl, facebookCallback } = require("../controllers/oauth.controller");

const oauthRouter = express.Router();

oauthRouter.get("/google", getGoogleAuthUrl)
oauthRouter.get(`/google/callback`, googleCallback);

// oauthRouter.get("/facebook", getFacebookAuthUrl);
// oauthRouter.get("/facebook/callback", facebookCallback);

module.exports = oauthRouter;