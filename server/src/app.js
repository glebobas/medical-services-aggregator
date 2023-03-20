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

app.use(express.static(path.join(__dirname, '../public/')));
const jwt = require('jsonwebtoken');
const http = require('http');

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    credentials: true,
    methods: ['GET, POST, PUT, DELETE, OPTIONS'],
  },
});

const AuthRoutes = require('./routes/auth.Routes');
const ClinicRoutes = require('./routes/clinic.Routes');
const UserRoutes = require('./routes/user.Routes');
const MainRoutes = require('./routes/main.Routes');

// app.use((req, res, next) => {
//     const jwtSecret = process.env.JWT_SECRET
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     jwt.verify(token, jwtSecret, (err, decodedToken) => {
//         if (err) {
//             return res.status(401).json({ message: 'Authentication failed: Invalid token' });
//         }
//         req.user = decodedToken;
//         next();
//     });
//     console.log('\n\x1b[33m', 'req.session.user :', req.session?.user);
//     res.locals.username = req.session?.user?.name;
//     next();
// });

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
  next();
});

const PORT = process.env.PORT || 4002;

app.use('/main', MainRoutes);
app.use('/auth', AuthRoutes);
app.use('/clinical', ClinicRoutes);
app.use('/profile', UserRoutes);

// app.get("/", (req, res) => {
//
//   res.send(`Hello world!`)
// })

server.listen(4000, () => {
  try {
    console.log(`Listening on port: ${PORT}`);
  } catch (error) {
    console.log('!!! ERROR ->>> Server not started', error);
  }
});
