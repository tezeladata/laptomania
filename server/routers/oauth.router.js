const express = require("express");
const { googleCallback, getGoogleAuthUrl } = require("../controllers/oauth.controller");

const oauthRouter = express.Router();

oauthRouter.get("/google", getGoogleAuthUrl)
oauthRouter.get(`/google/callback`, googleCallback);

module.exports = oauthRouter;