const express = require('express')
const app = express()
require('dotenv').config()
const video = require("./routes/Videos.js")
const fs = require('fs')
const cors = require('cors')

//console.log(process.env.PORT) object that has our .env variables
const {PORT, API_KEY} = process.env
// const checkAPIKey = (req, res, next) => {
//     const apiKey = req.header('API-Key')
//     if(!apiKey) {
//         return res.status(401).json({error: 'API key is missing'})
//     } else if (apiKey !== API_KEY ) {
//         return res.status(403).json({error: 'API key is invalid'})
//     }
//     next()
// }
// app.use(checkAPIKey)

app.use(express.json())
app.use(cors())
app.use('/videos', video)
app.use(express.static('./public/images'))
app.listen(PORT)