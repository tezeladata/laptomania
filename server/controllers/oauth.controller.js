const axios = require("axios");
const User = require("../models/user.model");
const { createSendToken } = require("./auth.controller");
const AppError = require("../utils/appError");

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"

const getGoogleAuthUrl = (req, res) => {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: "openid email profile",
        access_type:"offline",
        prompt: "consent"
    });

    res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`)
}

const googleCallback = async (req, res, next) => {
    try {
        const {code} = req.query;

        const tokenResponse = await axios.post(GOOGLE_TOKEN_URL, {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code"
        });

        const {access_token} = tokenResponse.data;

        const userInfo = await axios.get(GOOGLE_USERINFO_URL, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        
        const {email, name, picture, sub, email_verified} = userInfo.data;

        const redirectUrl = process.env.CLIENT_URL || "http://localhost:5173";

        let user = await User.findOne({ $or: [{ oauthid: sub }, { email }] });
        if (user) {
            if (!user.oauthid) {
                user.oauthid = sub;
                user.oauthProvider = "google";
                if (!user.avatar && picture) {
                    user.avatar = picture;
                }
                await user.save();
            }
            return createSendToken(user, 200, res, { redirectUrl });
        }

        if(!email_verified) {
            return next(new AppError("Google account not verified", 400))
        }

        const newUser = await User.create({
            fullname: name,
            email,
            avatar: picture,
            oauthid: sub,
            oauthProvider: "google",
            isVerified: true,
        })

        createSendToken(newUser, 201, res, { redirectUrl })
    } catch(e) {
        console.error("Google OAuth error:", e.response?.data || e.message || e);
        return next(new AppError("Unable to authenticate with Google. Please try again.", 500));
    }
};

const FACEBOOK_AUTH_URL = "https://www.facebook.com/v17.0/dialog/oauth";
const FACEBOOK_TOKEN_URL = "https://graph.facebook.com/v17.0/oauth/access_token";
const FACEBOOK_USERINFO_URL = "https://graph.facebook.com/me";
const FACEBOOK_REDIRECT_URI = process.env.FACEBOOK_REDIRECT_URI || "http://localhost:3000/api/oauth/facebook/callback";
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_APP_SECRET;

const getFacebookAuthUrl = (req, res) => {
    const params = new URLSearchParams({
        client_id: FACEBOOK_CLIENT_ID,
        redirect_uri: FACEBOOK_REDIRECT_URI,
        scope: "public_profile,email",
        response_type: "code"
    });

    res.redirect(`${FACEBOOK_AUTH_URL}?${params.toString()}`)
};

const facebookCallback = async (req, res, next) => {
    try {
        const { code } = req.query;

        if (!code) {
            return next(new AppError("Missing authorization code", 400));
        }

        const tokenResponse = await axios.get(FACEBOOK_TOKEN_URL, {
            params: {
                client_id: FACEBOOK_CLIENT_ID,
                client_secret: FACEBOOK_CLIENT_SECRET,
                redirect_uri: FACEBOOK_REDIRECT_URI,
                code,
            }
        });

        const { access_token } = tokenResponse.data;

        if (!access_token) {
            return next(new AppError("Unable to retrieve Facebook access token", 500));
        }

        const userInfo = await axios.get(FACEBOOK_USERINFO_URL, {
            params: {
                fields: "id,name,email,picture.width(400)",
                access_token
            }
        });

        const { id, name, email, picture } = userInfo.data;

        if (!email) {
            return next(new AppError("Facebook account email permission is required", 400));
        }

        const redirectUrl = process.env.CLIENT_URL || "http://localhost:5173";
        const avatar = picture?.data?.url;

        let user = await User.findOne({ $or: [{ oauthid: id }, { email }] });
        if (user) {
            if (!user.oauthid) {
                user.oauthid = id;
                user.oauthProvider = "facebook";
                if (!user.avatar && avatar) {
                    user.avatar = avatar;
                }
                await user.save();
            }
            return createSendToken(user, 200, res, { redirectUrl });
        }

        const newUser = await User.create({
            fullname: name,
            email,
            avatar,
            oauthid: id,
            oauthProvider: "facebook",
            isVerified: true,
        });

        return createSendToken(newUser, 201, res, { redirectUrl });
    } catch (e) {
        console.error("Facebook OAuth error:", e.response?.data || e.message || e);
        return next(new AppError("Unable to authenticate with Facebook. Please try again.", 500));
    }
};

const getGithubAuthUrl = (req, res) => {
    const rootUrl = 'https://github.com/login/oauth/authorize';
    const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
        scope: `read:user user:email`
    });

    res.redirect(`${rootUrl}?${params.toString()}`)
};

const githubCallback = async (req, res, next) => {
    try {
        const { code } = req.query;

        if (!code) {
            return next(new AppError("Missing authorization code", 400));
        }

        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
                redirect_uri: process.env.GITHUB_REDIRECT_URI
            },
            {
                headers: { Accept: "application/json" }
            }
        );

        const access_token = tokenResponse.data?.access_token;

        if (!access_token) {
            return next(new AppError("Unable to retrieve GitHub access token", 500));
        }

        const userInfo = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: "application/vnd.github+json"
            }
        });

        let { id, name, email, avatar_url, login } = userInfo.data;

        if (!email) {
            const emailResponse = await axios.get("https://api.github.com/user/emails", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    Accept: "application/vnd.github+json"
                }
            });

            const primaryEmail = emailResponse.data?.find(emailInfo => emailInfo.primary && emailInfo.verified);
            const verifiedEmail = primaryEmail || emailResponse.data?.find(emailInfo => emailInfo.verified);
            email = primaryEmail?.email || verifiedEmail?.email;
        }

        if (!email) {
            return next(new AppError("GitHub account email permission is required", 400));
        }

        const redirectUrl = process.env.CLIENT_URL || "http://localhost:5173";
        const githubId = id?.toString();

        let user = await User.findOne({ $or: [{ oauthid: githubId }, { email }] });

        if (user) {
            let updated = false;
            if (!user.oauthid) {
                user.oauthid = githubId;
                user.oauthProvider = "github";
                updated = true;
            }
            if (!user.avatar && avatar_url) {
                user.avatar = avatar_url;
                updated = true;
            }
            if (!user.fullname && (name || login)) {
                user.fullname = name || login;
                updated = true;
            }
            if (!user.isVerified) {
                user.isVerified = true;
                updated = true;
            }
            if (updated) {
                await user.save();
            }
            return createSendToken(user, 200, res, { redirectUrl });
        }

        const displayName = name || login;

        const newUser = await User.create({
            fullname: displayName,
            email,
            avatar: avatar_url,
            oauthid: githubId,
            oauthProvider: "github",
            isVerified: true
        });

        return createSendToken(newUser, 201, res, { redirectUrl });
    } catch (e) {
        console.error("GitHub OAuth error:", {
            message: e.message,
            response: e.response?.data,
            status: e.response?.status,
            stack: e.stack
        });
        return next(new AppError("Unable to authenticate with GitHub. Please try again.", 500));
    }
}

module.exports = {googleCallback, getGoogleAuthUrl, getFacebookAuthUrl, facebookCallback, getGithubAuthUrl, githubCallback}