require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const AuthRoutes = require('./routes/auth.Routes')
<<<<<<< HEAD
const ClinicRoutes = require('./routes/clinic.Routes')
=======
const UserRoutes = require('./routes/user.Routes')
>>>>>>> f2875e1a759343be83995e0bce51ef15a5982dfa

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
);

const PORT = process.env.PORT || 4002;

app.use('/auth', AuthRoutes)
<<<<<<< HEAD
app.use('/clinical',ClinicRoutes)
=======
app.use('/profile', UserRoutes)

>>>>>>> f2875e1a759343be83995e0bce51ef15a5982dfa
app.get("/", (req, res) => {
  res.send(`Hello world!`)
})



app.listen(PORT, () => {
  try {
    console.log(`Listening on port: ${PORT}`);
  } catch (error) {
    console.log('!!! ERROR ->>> Server not started', error);
  }
});
