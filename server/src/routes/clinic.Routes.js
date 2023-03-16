const express = require("express");
const router = express.Router();
const { Clinic, Rating, Address, Doctor} = require("../../db/models");

router.post("/", async (req, res) => {
  const { id } = req.body;
  const getClinic = await Clinic.findOne({
    where: { id: id },
    include: { model: Address, nested: true },
    // include: { model: Rating,where: {clinicId: id} },
    raw: true,
  });
  const getRating = await Rating.findOne({where: {clinicId: id}, raw:true})
  const infoClinic = {
    ...getClinic, ...getRating
  }
  const getDoc = await Doctor.findAll()
  console.log(infoClinic);
  res.json(infoClinic);
});
module.exports = router;
