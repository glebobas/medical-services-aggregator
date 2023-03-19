const express = require("express");
const router = express.Router();
const {
  Clinic,
  Rating,
  Address,
  Doctor,
  Speciality,
} = require("../../db/models");

router.post("/", async (req, res) => {
  const { id } = req.body;
  const getClinic = await Clinic.findOne({
    where: { id: id },
    include: { model: Address },
    // include: { model: Rating,where: {clinicId: id} },
    raw: true,
  });
  const getRating = await Rating.findOne({
    where: { clinicId: id },
    raw: true,
  });
  const getDocs = await Doctor.findAll({
    where: { clinicId: id },
    include: { model: Rating, left: true, nested: true },
    raw: true,
  });
  const infoClinic = {
    ...getClinic,
    ...getRating,
  };
  const allAcc = await Doctor.findAll({where: {clinicId:id},
     include: { all: true }, raw:true });
  //    const clinicData = {
  //     clinicInfo: {
  //     id: clinic.infoClinic.id,
  //     name: clinic.infoClinic.name,
  //     phone: clinic.infoClinic.phone,
  //     email: clinic.infoClinic.email,
  //     generalInfo: clinic.infoClinic.generalInfo
  //   },
  //   addressClinic: {
  //     country:clinic.infoClinic["Address.countryName"],
  //     city: clinic.infoClinic['Address.cityName'],
  //     street: clinic.infoClinic['Address.streetName'],
  // },
  // }
  // console.log(allAcc);
  res.json({ infoClinic, allAcc });
});

module.exports = router;
