const {Reminder, Medicine} = require('../models')

class ReminderController{

    static async getReminder (req,res,next){
        try {
            const reminder = await Reminder.findAll({
                where: {
                    UserId: req.user.id,
                },
                include: [{
                    model: Medicine,
                    attributes:{
                        exclude: ['createdAt', `updatedAt`, `UserId`, `ReminderId`]
                    }
                }]
                
            })

            if(!reminder){
                throw ({name: `ReminderNotFound`})
            }

            res.status(200).json(reminder)
        } catch (error) {
            next(error)
        }
    }

    static async addReminder (req,res,next){
        try {
            const {name} = req.body
            const reminder = await Reminder.create({name, UserId: req.user.id})

            res.status(201).json(reminder)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async deleteReminder (req,res,next){
        try {
            const {reminderId} = req.params
            const reminder = await Reminder.findOne({
                where: {
                    id: reminderId,
                    UserId : req.user.id
                }
            })

            if(!reminder){
                throw({name: `ReminderNotFound`})
            }

            await reminder.destroy()

            res.status(200).json({
                message: `Reminder Deleted`
            })
        } catch (error) {
            next(error)
        }
    }


    static async updateReminder (req,res,next){

        try {
            
            const {reminderId} = req.params
            const {name} = req.body
    
            const reminder = await Reminder.findOne({
                where: {
                    id: reminderId,
                    UserId: req.user.id
                }
                
            })
    
            if(!reminder){
                throw({name: `ReminderNotFound`})
            }
    
            const data = await reminder.update({name, UserId: req.user.id})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ReminderController