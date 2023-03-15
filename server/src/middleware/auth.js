const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET

function authenticate(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: Missing token' });
    }
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed: Invalid token' });
        }
        req.user = decodedToken;
        next();
    });
}

module.exports = authenticate;
