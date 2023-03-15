const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User, Slot} = require('../../db/models')
const express = require('express');
const authenticate = require("../middleware/auth");
const router = express.Router();


const jwtSecret = process.env.JWT_SECRET

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({where: { username }})
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed: Invalid username or password' });
        }
        // const passwordMatch = await bcrypt.compare(password, user.password);
        // if (!passwordMatch) {
        //     return res.status(401).json({ message: 'Authentication failed: Invalid username or password' });
        // }
        const token = jwt.sign(
            { id: user.id, username: user.username },
            jwtSecret,
            { expiresIn: '1h' }
        );
        const userReady = await User.findOne({where: { username }, attributes: { exclude: ['password'] },})
        res.json({ token, userReady, message: `Welcome, ${req.body.username}!`  });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/register', async (req, res) => {
    const { username, password, firstName, lastName, email, telephone, secretPhrase } = req.body;
    console.log("-> req.body", req.body);
    const truePhrase = process.env.SECRET_ADMIN_PHRASE;

    try {
    const existingUser = await User.findOne({where: { username }, attributes: { exclude: ['password'] },});
    if (existingUser) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    if (!(username && password && firstName && lastName && email && telephone)) {
        return res.status(409).json({ message: "Fields couldn't be empty!" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if (secretPhrase === truePhrase) {
        try {
            const newAdmin = await User.create({ username, password: passwordHash, firstName, lastName, email, telephone  });
            res.json({ message: 'New admin registered successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to register admin' });
        }
    }


        const newUser = await User.create({ username, password: passwordHash, firstName, lastName, email, telephone  });
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to register user' });
    }
});

module.exports = router;
