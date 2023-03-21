const express = require('express');
const authenticate = require("../middleware/auth.middleware");
const router = express.Router();



const {DeleteReview, NewEntry} = require("../controllers/userAction.Controller");

router.delete('/review/delete', authenticate, DeleteReview) //* удаляем отзыв

// router.patch('/review/edit', authenticate, EditRecordsInProfile)
//
// router.patch('/review/new', authenticate, EditRecordsInProfile)

router.patch('/shedule/visit', authenticate, NewEntry); //* обновляем в расписании состояние с null на pending или cancelled

module.exports = router;
