const express = require('express');
const {CheckUserAndCreateToken, CreateUser, VerifyUser} = require("../controllers/auth.Controller");
const router = express.Router();

const jwtSecret = process.env.JWT_SECRET;

router.post('/login', CheckUserAndCreateToken);


router.post('/register', CreateUser);

router.post('/user', VerifyUser);

module.exports = router;
