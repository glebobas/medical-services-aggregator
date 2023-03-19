const express = require('express');
const authenticate = require("../middleware/auth.middleware");
const router = express.Router();

const {GetProfileArrays, EditRecordsInProfile, DeleteRecordsFromProfile, EditProfile} = require("../controllers/profile.Controller");

router.get('/:userId',  GetProfileArrays)

router.patch('/edit', authenticate, EditRecordsInProfile)

router.patch('/profileEditing', authenticate, EditProfile)

router.delete('/delete', authenticate, DeleteRecordsFromProfile)  //* нужна ли эта ручка?

module.exports = router;
