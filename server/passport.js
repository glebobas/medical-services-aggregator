const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { User } = require('./db/models/user'); // replace with your own user model

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET; // use your own secret

passport.use(new Strategy(opts, async (jwtPayload, done) => {
    try {
        const user = await User.findByPk(jwtPayload.id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err, false);
    }
}));

module.exports = passport;
