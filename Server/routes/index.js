const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const userRoute = require(`./userRoute`)
const reminderRoute = require('./reminderRoute')
const UserController = require('../controllers/userController')




router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleSignIn', UserController.googleSignIn)
router.use('/reminders', reminderRoute)



router.use(errorHandler)


module.exports = router