const express = require("express");

const router = express.Router();

const {

    SomeClinicsFromSearch,
    ExactClinic,
} = require("../controllers/clinic.Controller");

const {
    GetAllClinicAndDoctors, GetAllClinicAndDoctorsQuery
} = require("../controllers/main.Controller");

const {
    SomeDoctorsFromSearch,
    DoctorOnAddress,
    ExactDoctor,
    NewEntry
} = require("../controllers/doctor.Controller");

router.get("/alldata/:inputText", GetAllClinicAndDoctors);
router.get("/alldataquery", GetAllClinicAndDoctorsQuery);

// router.post("/someclinics", SomeClinicsFromSearch);
//
// router.get("/clinic/:clinicId", ExactClinic);
//
//
// router.post("/somedoctors", SomeDoctorsFromSearch);
//
// router.post("/doctors", DoctorOnAddress);
//
// router.get('/doctor/:doctorId', ExactDoctor);
//
//
// router.post('/shedule/new', NewEntry);

module.exports = router;
