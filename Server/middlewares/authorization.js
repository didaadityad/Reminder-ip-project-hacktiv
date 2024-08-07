const {Reminder} = require("../models")

module.exports = async function authorization (req,res,next) {
    try {
        const {reminderId} = req.params
        const reminder = await Reminder.findByPk(reminderId)
        if(!reminder){
            throw {name: "ReminderNotFound"}
        }

        if ( reminder.UserId !== req.user.id){
            throw {name: "NoAccess"}
        }
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}