const express = require("express");
const router = express.Router();
const { Clinic, Rating, Address, Doctor } = require("../../db/models");

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
    include: { model: Rating, nested: true },
    raw: true,
  });
  const infoClinic = {
    ...getClinic,
    ...getRating,

  };
  // console.log(infoClinic);
  res.json({infoClinic, getDocs});
});
// router.post("/doc", async (req,res) => {
//   const {id} = req.body
//   const getDocs = await Doctor.findAll({where: {clinicId: id}, include: { model: Rating , nested: true } ,raw:true})
//   res.json(getDocs)
// })

module.exports = router;
