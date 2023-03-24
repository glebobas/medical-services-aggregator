const express = require('express');
const authenticate = require("../middleware/auth.middleware");
const router = express.Router();

const {DeleteReview, NewEntry, EditReviewWithRating, NewReview, NewRating, NewUserMessage} = require("../controllers/userAction.Controller");

router.delete('/review/delete', authenticate, DeleteReview) //* удаляем отзыв

router.patch('/review/edit', authenticate, EditReviewWithRating) //* редачим коммент от имени залогенненого юзера
//
router.post('/review/new', authenticate, NewReview) //* добавляем новый коммент

router.patch('/shedule/visit', authenticate, NewEntry); //* обновляем в расписании состояние с null на pending или cancelled

router.post('/rating/new', authenticate, NewRating) //* добавляем новый рейтинг

router.post('/message/new', NewUserMessage) //* добавляем новое сообщение юзеру (внутренний эндпоинт, используемый другими эндпоинтами)

// router.get('/messages', authenticate, GetUserMessage) //* получаем сообщения для юзера


module.exports = router;
