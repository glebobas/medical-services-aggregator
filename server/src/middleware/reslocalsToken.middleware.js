const jwt = require("jsonwebtoken");

function tokenToLocals(req, res, next) {

    if (req.headers['authorization']) {

            const jwtSecret = process.env.JWT_SECRET
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                decodedToken?.id ? res.locals.user = decodedToken : null
                next();
            });
            console.log('\n\x1b[33m', 'req.user :', res.locals.user);
        }
    if (!req.headers['authorization']) {
        next()
    }

}

module.exports = tokenToLocals;
