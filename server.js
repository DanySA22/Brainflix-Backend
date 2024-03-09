const express = require('express')      
const app = express()
require('dotenv').config()
const video = require("./routes/videos.js")
const cors = require('cors')

const {PORT} = process.env

app.use(express.json())
app.use(cors())

app.use('/videos', video)
app.use(express.static('./public/images-video'))
app.listen(PORT)