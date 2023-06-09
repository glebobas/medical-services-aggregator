const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User} = require('../../db/models')
const express = require('express');
const app = express();
const {google} = require('googleapis');
const {OAuth2Client} = require('google-auth-library');
// const { sendMail } = require('../nodeMailer');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);


const jwtSecret = process.env.JWT_SECRET

// setup nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.USER_MAIL,
      clientId: process.env.YOUR_CLIENT_ID,
      clientSecret: process.env.YOUR_CLIENT_SECRET,
      accessToken: process.env.ACCESS_TOKEN,
      expires: 1484314697598,
      refreshToken: process.env.REFRESH_TOKEN,
      accessUrl: process.env.ACCESS_URL
    }
  },
  {
    from: 'Medical AG <d.kovalenko174@gmail.com>'
  }
)

transporter.verify((error, success) => {
  if (error) return console.log(error)
  console.log('Server is ready to take our message', success)
  transporter.on("token", (token) => {
    console.log("A new access token was generated");
    console.log("User: %s", token.user);
    console.log("Access Token: %s", token.accessToken);
    console.log("Expires: %s", new Date(token.expires));
  });
})

const mailer = () => {
  transporter.sendMail({
    to: 'medical.app.work@gmail.com',
    subject: 'Test',
    text: 'sdfdsfs'
  })
}


exports.CheckUserAndCreateToken = async (req, res) => {
  try {
    const {username, password} = req.body;

    const user = await User.findOne({where: {username}})

    if (!user?.username) {
      return res.status(401).json({error: 'Authentication failed: Invalid username or password'});
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({error: 'Authentication failed: Invalid username or password'});
    }
    const token = jwt.sign(
      {id: user.id, username: user.username},
      jwtSecret,
      {expiresIn: '5h'}
    );
    const userReady = await User.findOne({where: {username}, attributes: {exclude: ['password']},})
    if (userReady.username) {
      res.json({token, userReady, message: `Welcome, ${username}!`});
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Server error'});
  }
};


exports.CreateUser = async (req, res) => {
  const {username, password, firstName, lastName, email, telephone, secretPhrase} = req.body;
  const truePhrase = process.env.SECRET_ADMIN_PHRASE;

  try {
    const existingUser = await User.findOne({where: {username}, attributes: {exclude: ['password']},});

    if (existingUser) {
      return res.status(409).json({error: 'Username already exists'});
    }

    if (!(username && password && firstName && lastName && email && telephone)) {
      return res.status(409).json({error: "Fields couldn't be empty!"});
    }

    if (!username || !username.match(/^[A-Za-z]\w+$/)) {
      return res.status(400).send({error: 'Invalid login format'});
    }

    if (username.length < 4) {
      return res
        .status(400)
        .send({error: 'Login must be at least 4 characters long'});
    }


    const regexTel = /^[0-9+-]+$/;
    if (!regexTel.test(telephone)) {
      return res.status(409).json({error: "Phone number consists of numbers (123), plus sign (+), and minus sign (-)."});
    }

    const regexName = /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/;
    if (!regexName.test(firstName) || !regexName.test(lastName)) {
      return res.status(409).json({error: "Name could consist only of words"});
    }


    if (!/^[A-Z0-9a-z._%+-]+@[A-Z0-9a-z.-]+\.[A-Za-z]{2,}$/.test(email)) {
      return res.status(400).send({error: 'Invalid email address'});
    }

    if (!password || password.length < 3) {
      return res
        .status(400)
        .send({error: 'Password must be at least 3 characters long'});
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // if (secretPhrase === truePhrase) {
    //     try {
    //         const newAdmin = await User.create({
    //             username,
    //             password: passwordHash,
    //             firstName,
    //             lastName,
    //             email,
    //             telephone
    //         });
    //         res.json({message: 'New admin registered successfully'});
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({message: 'Failed to register admin'});
    //     }
    // }
    const newUser = await User.create({username, password: passwordHash, firstName, lastName, email, telephone});
    mailer()
    // sendMail('slavpolichev@gmail.com', 'Welcome', 'Thanks for joining our team!');
    res.json({message: 'Registration successful!'});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to register user'});
  }
};


exports.VerifyUser = async (req, res) => {
  try {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, jwtSecret, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({error: 'Authentication failed: Invalid token'});
      }
      const {username} = decodedToken

      const userReady = await User.findOne({where: {username}, attributes: {exclude: ['password']},})
      res.json(userReady);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Server error'});
  }
};

exports.loginWithGoogle = async (req, res) => {
  try {
    const {username, userId} = req.body;


    const token = jwt.sign(
      {id: Number(userId), username},
      jwtSecret,
      {expiresIn: '5h'}
    );

    const userReady = await User.findOne({where: {username},})
    if (token) {
      res.json({token, userReady, message: `Welcome, ${userReady.firstName}!`});
    }
    if (!token) {
      res.json({message: 'Couldn\'t generate token!'});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Server error'});
  }
}

exports.googleCallback = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];


  const data = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
  const {sub, name, given_name, family_name, email, picture} = await data.json()


  if (name) {

    const trueLogin = sub
    const firstName = given_name
    const lastName = family_name
    let newUser;
    const userExisted = await User.findOne({where: {username: trueLogin}})
    const userId = userExisted?.id
    if (!userExisted) {
      console.log("-> await data.json()", picture);
      newUser = await User.create({
        username: trueLogin,
        firstName,
        lastName,
        email,
        avatarGoogle: picture
      }, {raw: true, nest: true});
      const username = newUser?.username
      const userId = newUser?.id
      const data = await fetch('http://localhost:4000/auth/google/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, userId}),
      })
      const result = await data.json()
      if (result.token) {
        return res.json(result)
      }
      if (!result.token) {
        return res.json({message: 'Login is failed'})
      }
    }
    if (userExisted) {
      const username = userExisted?.username
      const data = await fetch('http://localhost:4000/auth/google/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, userId}),
      })
      const result = await data.json()
      if (result.token) {
        return res.json(result)
      }
      if (!result.token) {
        return res.json({message: 'Login is failed'})
      }

    }
  }

}

