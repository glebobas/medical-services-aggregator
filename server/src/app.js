require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const AuthRoutes = require('./routes/auth.Routes')
const UserRoutes = require('./routes/user.Routes')

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
app.use('/profile', UserRoutes)

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
