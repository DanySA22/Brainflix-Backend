const express = require('express')      
const app = express()
require('dotenv').config()
const video = require("./routes/videos.js")
const cors = require('cors')

const {PORT, API_KEY} = process.env
// const checkAPIKey = (req, res, next) => {
//     const apiKey = req.query.api_key
//     console.log('First', req.query.api_key)
//     console.log(API_KEY)
//     if(!apiKey) {
//         return res.status(401).json({error: 'API key is missing'})
//     } 
//     // else if (apiKey !== API_KEY ) {
//     //     return res.status(403).json({error: 'API key is invalid'})
//     // }
//     next()
// }
// app.use(checkAPIKey)

app.use(express.json())
app.use(cors())

app.use('/videos', video)
app.use(express.static('./public/images-video'))
app.listen(PORT)