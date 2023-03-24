const express = require('express');
const router = express.Router();

const {DeleteReview, NewEntry, EditReviewWithRating, NewReview, NewRating, NewUserMessage, GetUserMessage,
    DeleteUserMessage
} = require("../controllers/userAction.Controller");
const tokenToLocals = require("../middleware/reslocalsToken.middleware");

router.delete('/review/delete', DeleteReview) //* удаляем отзыв

router.patch('/review/edit', EditReviewWithRating) //* редачим коммент от имени залогенненого юзера
//
router.post('/review/new', NewReview) //* добавляем новый коммент

router.patch('/shedule/visit', NewEntry); //* обновляем в расписании состояние с null на pending или cancelled

router.post('/rating/new', NewRating) //* добавляем новый рейтинг

router.get('/messages', GetUserMessage) //* получаем сообщения для юзера

router.delete('/messages', DeleteUserMessage)  //*удаляем сообщения юзера


module.exports = router;
