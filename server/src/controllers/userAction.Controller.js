const {Doctor, Clinic, Address, Speciality, Rating, Slot,Review, Shedule} = require("../../db/models");

exports.DeleteReview = async (req, res) => {
    try {
        const {reviewId} = req.body;

        if (reviewId) {
            const deletedReview = await Review.destroy(
                {
                    where: {id: reviewId},
                }
            );

            if (deletedReview === 0) {
                return res.status(404).json({message: 'Error while deleting'});
            }
            res.status(200).json({message: 'Deleting was successful'});
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}


exports.NewEntry = async (req, res) => {
    const {sheduleId, statusAppointment} = req.body

    const userId = res?.locals?.user?.id


    try {

        const [nmbOfUpdatedShedule, updatedShedule] = await Shedule.update({statusAppointment, userId}, {
            where: {
                id: Number(sheduleId),
            },
            returning: true,
            plain: true,
        })
        if (nmbOfUpdatedShedule === 0) {
            return res.status(404).json({message: 'Error while updating shedule'});
        }

        res.status(200).json({user: updatedShedule})


    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }

}
