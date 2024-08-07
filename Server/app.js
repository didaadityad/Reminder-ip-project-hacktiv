if (process.env.NODE_ENV !== "production"){
    require("dotenv").config();
  }

const express = require('express')
const app = express()
const router = require('./routes')

const cors = require('cors')


app.use(cors())
app.set(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)






module.exports = app