const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({path:'../.env'});

// Verify a user's accessToken
function verifyToken(req, res, next) {
    try {
        const accessToken = req.cookies.accessToken;

        if (accessToken == null) {
            return res.sendStatus(401);
        }

        const authorizedUser = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = authorizedUser.id;
        next();
    }
    catch (err) {
        return res.sendStatus(403);
    }
}

module.exports = verifyToken;