const express = require('express');
const authenticate = require("../middleware/auth.middleware");
const router = express.Router();

const {GetProfileArrays, EditRecordsInProfile, DeleteRecordsFromProfile, EditProfile} = require("../controllers/profile.Controller");


//!  после диплоя в самом конце - вставить во все ручки здесь миддлварку - authenticate

router.get('/:userId',  GetProfileArrays)

router.patch('/edit',  EditRecordsInProfile)

router.patch('/profileEditing', EditProfile)

router.delete('/delete',  DeleteRecordsFromProfile)

module.exports = router;
