const {User, Shedule, Doctor, Clinic, Address, Speciality, Rating, Slot} = require('../../db/models')
const {Op} = require("sequelize");


exports.ExactClinic = async (req, res) => {
    try {
        const {clinicId} = req.params;
        const clinic = await Clinic.findOne({where: {id: clinicId}, include: [{model: Address}]})

        const responseRating = await Rating.findAll({where: {clinicId}})


        const clinicRating = responseRating.reduce((acc, val) => {
            acc += val.clinicRating;
            return acc
        }, 0)
        const averageClinicRating = (clinicRating / responseRating.length).toLocaleString('en-US', {maximumFractionDigits: 1})
        const readyClinic = [clinic].map((el) => {
            const fulladdress = `${el.Address.streetName}, ${el.Address.cityName}, ${el.Address.countryName}`;
            return {
                id: el.id,
                name: el.name,
                email: el.email,
                phone: el.phone,
                address: fulladdress,
                generalInfo: el.generalnfo,
                averageClinicRating,
                avatar: el.avatar
            }
        })
        if (clinic) {
            res.json({readyClinic})
        } else res.json({message: "Couldn't find doctor"})
    } catch (e) {
        console.error(e)
    }
};


