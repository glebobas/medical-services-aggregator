const express = require('express');
const {CheckUserAndCreateToken, CreateUser, VerifyUser, googleCallback, loginWithGoogle} = require("../controllers/auth.Controller");
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET;

router.post('/google/login', loginWithGoogle)

router.get('/google/callback', googleCallback)



router.post('/login', CheckUserAndCreateToken);


router.post('/register', CreateUser);

router.post('/user', VerifyUser);

module.exports = router;
