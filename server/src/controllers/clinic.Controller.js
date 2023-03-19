const {User, Shedule, Doctor, Clinic, Address, Speciality, Rating, Slot} = require('../../db/models')
const {Op} = require("sequelize");


exports.ExactClinic = async (req, res) => {
    try {
        const {clinicId} = req.params;
        const clinic = await Clinic.findOne({where: {id: clinicId}, include: [{model: Address}]})
        const doctors = await Doctor.findAll({where: {clinicId}})

        const responseRating = await Rating.findAll({where: {clinicId}})

        const clinicRating = responseRating.reduce((acc, val) => {
            acc += val.clinicRating;
            return acc
        }, 0)
        const averageClinicRating = (clinicRating / responseRating.length).toLocaleString('en-US', {maximumFractionDigits: 1})
        let readyClinic;
        if (res?.locals?.user?.id) {
            const ratingToUser = await Rating.findAll({where: {userId: res.locals.user.id}})
            readyClinic = [clinic].map((el) => {
                const fulladdress = `${el.Address.streetName}, ${el.Address.cityName}, ${el.Address.countryName}`;
                let ownRatingUser;
                ratingToUser?.forEach(element => {
                    if (element.userId === res.locals.user.id && el.id === element.clinicId) {
                        ownRatingUser = element.clinicRating
                    }
                })
                return {
                    id: el.id,
                    name: el.name,
                    email: el.email,
                    phone: el.phone,
                    address: fulladdress,
                    generalInfo: el.generalnfo,
                    averageClinicRating,
                    alreadyScoredPoints: ownRatingUser,
                    avatar: el.avatar
                }
            })
        }
        if (!res?.locals?.user?.id) {

            readyClinic = [clinic].map((el) => {
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
        }
        if (clinic.id) {
            res.json({readyClinic, doctors})
        } else res.json({message: "Couldn't find clinic"})
    } catch (e) {
        console.error(e)
    }
};


