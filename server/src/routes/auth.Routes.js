const express = require('express');
const {CheckUserAndCreateToken, CreateUser, VerifyUser, generateGoogleURL, googleCallback} = require("../controllers/auth.Controller");
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET;

router.get('/google', generateGoogleURL)

router.get('/google/callback', googleCallback)



router.post('/login', CheckUserAndCreateToken);


router.post('/register', CreateUser);

router.post('/user', VerifyUser);

module.exports = router;
