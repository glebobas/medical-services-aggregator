const express = require('express');

const router = express.Router();

const {GetProfileArrays, EditRecordsInProfile, DeleteRecordsFromProfile, EditProfile} = require("../controllers/profile.Controller");

router.get('/:userId', GetProfileArrays)

router.patch('/edit', EditRecordsInProfile)

router.patch('/profileEditing', EditProfile)

router.delete('/delete', DeleteRecordsFromProfile)  //* нужна ли эта ручка?

module.exports = router;
