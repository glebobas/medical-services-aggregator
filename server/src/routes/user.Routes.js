const express = require('express');
const authenticate = require("../middleware/auth.middleware");
const router = express.Router();

const {GetProfileArrays, EditRecordsInProfile, DeleteRecordsFromProfile} = require("../controllers/profile.Controller");

//!  вставить во все ручки здесь миддлварку - authenticate

router.get('/:userId',  GetProfileArrays)


router.patch('/edit',  EditRecordsInProfile)


router.delete('/delete',  DeleteRecordsFromProfile)

module.exports = router;
