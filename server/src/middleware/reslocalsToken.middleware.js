const jwt = require("jsonwebtoken");

function tokenToLocals(req, res, next) {

    if (req.headers['authorization']) {

            const jwtSecret = process.env.JWT_SECRET
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if (err) {
                    next();
                }
                res.locals.user = decodedToken;
                next();
            });
            console.log('\n\x1b[33m', 'req.user :', res.locals.user);
        }

}

module.exports = tokenToLocals;
