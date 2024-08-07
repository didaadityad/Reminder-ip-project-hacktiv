const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const {User} = require("../models")

class UserController {

    static async register (req,res,next){
        try {
            const {name, email, password} = req.body
            let data = await User.create({name, email, password})


            res.status(201).json(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async login (req,res,next){
        try {
            const {email, password} = req.body
            if (!email){
                throw({name: "Email is empty"})
            }

            if(!password){
                throw({name: "Password is empty"})
            }

            const user = await User.findOne({
                where: {email}
            })

            if (!user || !comparePassword(password, user.password)){
                throw ({name: "InvalidUser"})
            }

            const access_token = signToken ({id: user.id})
            res.status(200).json({
                access_token: access_token,
                email: user.email,
            })
        } catch (error) {
            next(error)
        }
    }

    static async googleSignIn (req,res,next){
        try {
            const {OAuth2Client} = require("google-auth-library")
            const {googleToken} = req.body

            const client = new OAuth2Client()

            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: "972119625034-ik0atq4goh1p2g1o37auivvmrka64fp1.apps.googleusercontent.com"
            })

            const payload = ticket.getPayload()
            console.log(payload, "<<<<<<<< PAYLOAD GOOGLE")

            let user = await User.findOne({
                where: {email: payload.email}
            })

            if(!user){
                user = await User.create(
                    {
                        email: payload.email,
                        password: "Rahasia"
                    },
                    {
                        hooks: false
                    }
                )
            }

            const access_token = signToken({id: user.id})

            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }

}


module.exports = UserController