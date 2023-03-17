const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const router = express.Router();

const {
    GetAllClinicAndDoctors, GetAllClinicAndDoctorsQuery, GetAllSpecialities, GetAllAddresses
} = require("../controllers/main.Controller");
const tokenToLocals = require("../middleware/reslocalsToken.middleware");
const {DoctorsFromSearch, ExactDoctor} = require("../controllers/doctor.Controller");
const {ExactClinic} = require("../controllers/clinic.Controller");


router.get("/alldata/:inputText", tokenToLocals, GetAllClinicAndDoctors); //* получаем все клиники и врачей ПОСЛЕ ввода в инпут поисковой строки

router.get("/alldataquery", tokenToLocals, GetAllClinicAndDoctorsQuery); //* получаем все клиники и врачей (если юзер залогинен то к эл-там массива добавится инфа о поставленных юзером оценках)

router.get('/specialities', GetAllSpecialities) //* получаем все специальности

router.get('/addresses', GetAllAddresses) //* получаем все адреса

router.post("/somedoctors", DoctorsFromSearch); //* получаем список врачей после ввода необходимых данных в поиске

router.get('/doctor/:doctorId', ExactDoctor); //* получаем доктора после выбора из поисковой выдачи

router.get("/clinic/:clinicId", ExactClinic); //* получаем клинику после выбора из поисковой выдачи

// router.post('/shedule/new', NewEntry);

module.exports = router;
