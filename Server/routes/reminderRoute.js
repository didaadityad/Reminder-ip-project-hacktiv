const MedicineController = require("../controllers/medicineController")
const ReminderController = require("../controllers/reminderController")
const UserController = require("../controllers/userController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

const router = require(`express`).Router()


router.use(authentication)
router.get('/', ReminderController.getReminder)
router.post(`/`,ReminderController.addReminder)
router.delete('/:reminderId', authorization, ReminderController.deleteReminder)
router.put('/:reminderId', authorization, ReminderController.updateReminder)


//MEDICINE
router.get('/:reminderId/medicine', MedicineController.getMedicine)
router.post('/:reminderId/medicine', authorization, MedicineController.AddMedicine)
router.delete('/:reminderId/medicine/:medicineId',authorization, MedicineController.deleteMedicine)




module.exports = router