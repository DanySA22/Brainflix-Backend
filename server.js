const express = require('express')
const app = express()
require('dotenv').config()
const video = require("./routes/Videos.js")
const {PORT, API_KEY} = process.env
const fs = require('fs')
//console.log(process.env.PORT) object that has our .env variables
// app.get('/', (req, res) =>{
//     res.send('<h1>hello world</h1>')
// })

app.use(express.json())

app.use('/videos', video)
app.use(express.static('./public/images'))
app.listen(PORT)