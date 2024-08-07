const { generateMedicineDescription } = require("../helpers/OpenAi")
const {Reminder, Medicine} = require("../models")


class MedicineController {

    static async getMedicine (req,res,next){
        try {
            const { reminderId } = req.params;

            const reminder = await Reminder.findOne({
                where: {
                    id: reminderId,
                    UserId: req.user.id
                }
            });
            
            if(!reminder){
                throw({name: `ReminderNotFound`})
            }


            const medicines = await Medicine.findAll({
                where: {
                    ReminderId: reminderId,
                    UserId: req.user.id
                }
            });

            if (!medicines.length) {
                return res.status(404).json({ message: "No medicines found for this reminder" });
            }

            res.status(200).json(medicines);
        } catch (error) {
            next(error)
        }
    }


    static async AddMedicine(req, res, next) {

        try {
            const { reminderId } = req.params
            const { medicineName } = req.body

            const reminder = await Reminder.findByPk(reminderId)

            if(!reminder){
                throw({name: `ReminderNotFound`})
            }

            const description = await generateMedicineDescription(medicineName)

            const newMedicine = await Medicine.create({
                medicineName,
                description,
                ReminderId: reminder.id,
                UserId: req.user.id
            })
             res.status(201).json(newMedicine)
        } catch (error) {
            next(error)
        }
    }

    static async deleteMedicine(req,res,next){
        try {
            const {medicineId, reminderId} = req.params

            const userId = req.user.id

            const medicine = await Medicine.findOne({
                where: {
                    id: medicineId,
                    ReminderId: reminderId,
                    UserId: userId
                }
            })

            if (!medicine){
                throw({name: `MedicineNotFound`})
            }

            await medicine.destroy()

            res.status(200).json({
                message: `Medicine Deleted`
            })
        } catch (error) {
            
        }
    }

}

module.exports = MedicineController