const jwt = require('jsonwebtoken');
const {User} = require("../../db/models");

const jwtSecret = process.env.JWT_SECRET

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'Authentication failed: Missing token'});
    }
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({message: 'Authentication failed: Invalid token'});
        }
        req.user = decodedToken;
        res.locals.user = decodedToken;



        // console.log("-> res.locals.user", res.locals.user);

        next();
    });
}

module.exports = authenticate;
