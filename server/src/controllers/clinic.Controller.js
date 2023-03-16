const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User, Shedule, Doctor, Clinic, Address, Speciality, Rating, Slot} = require('../../db/models')
const express = require('express');
const authenticate = require("../middleware/auth.middleware");
const router = express.Router();


const jwtSecret = process.env.JWT_SECRET


