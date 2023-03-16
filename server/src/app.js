require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
app.use(express.static(path.join(__dirname, '../public/')));
const AuthRoutes = require('./routes/auth.Routes')
const ClinicRoutes = require('./routes/clinic.Routes')
const UserRoutes = require('./routes/user.Routes')
const MainRoutes = require('./routes/main.Routes')
const jwt = require("jsonwebtoken");


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

const PORT = process.env.PORT || 4002;

app.use('/main', MainRoutes)
app.use('/auth', AuthRoutes)
app.use('/clinical', ClinicRoutes)
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
