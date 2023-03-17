const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User} = require('../../db/models')
const express = require('express');
const app = express();



const jwtSecret = process.env.JWT_SECRET

exports.CheckUserAndCreateToken = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({where: {username}})
        if (!user.username) {
            return res.status(401).json({message: 'Authentication failed: Invalid username or password'});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({message: 'Authentication failed: Invalid username or password'});
        }
        const token = jwt.sign(
            {id: user.id, username: user.username},
            jwtSecret,
            {expiresIn: '5h'}
        );
        const userReady = await User.findOne({where: {username}, attributes: {exclude: ['password']},})
        if (userReady.username) {
            res.json({token, userReady, message: `Welcome, ${req.body.username}!`});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};


exports.CreateUser = async (req, res) => {
    const {username, password, firstName, lastName, email, telephone, secretPhrase} = req.body;
    const truePhrase = process.env.SECRET_ADMIN_PHRASE;

    try {
        const existingUser = await User.findOne({where: {username}, attributes: {exclude: ['password']},});
        if (existingUser) {
            return res.status(409).json({message: 'Username already exists'});
        }
        if (!(username && password && firstName && lastName && email && telephone)) {
            return res.status(409).json({message: "Fields couldn't be empty!"});
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        if (secretPhrase === truePhrase) {
            try {
                const newAdmin = await User.create({
                    username,
                    password: passwordHash,
                    firstName,
                    lastName,
                    email,
                    telephone
                });
                res.json({message: 'New admin registered successfully'});
            } catch (err) {
                console.error(err);
                res.status(500).json({message: 'Failed to register admin'});
            }
        }
        const newUser = await User.create({username, password: passwordHash, firstName, lastName, email, telephone});
        if (newUser.username) {
            res.json({message: 'User registered successfully'})
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Failed to register user'});
    }
};


exports.VerifyUser = async (req, res) => {
    try {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        jwt.verify(token, jwtSecret, async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({message: 'Authentication failed: Invalid token'});
            }
            const { username } = decodedToken

            const userReady = await User.findOne({where: {username}, attributes: {exclude: ['password']},})
            res.json(userReady);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

