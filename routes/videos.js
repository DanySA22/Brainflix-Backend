const express = require('express')
const router = express.Router()
const fs = require('fs')

const data = fs.readFileSync('./data/videos.json', 'utf8')
const dataAsObject = Array.from(JSON.parse(data))
console.log(dataAsObject[2].title)
console.log(dataAsObject.find((item) => item.id == "84e96018-4022-434e-80bf-000ce4cd12b8"))
router.get('/', (req, res) =>{
    res.json(dataAsObject)
    //  res.json(data)
})

router.get('/:id', (req, res) =>{
    const oneVideo = dataAsObject.find((item) => {item.id == req.params.id})
    res.json(oneVideo)
})

router.post('/', (req, res) =>{
    res.send('<h1>hello world 3</h1>')
})

router.post('/:id/comments', (req, res) =>{
    res.send('<h1>hello world 3</h1>')
})

router.delete('/:videoID/comments/:commentId', (req, res) =>{
    res.send('<h1>hello world 3</h1>')
})

router.put('/:videoId/likes', (req, res) =>{
    res.send('<h1>hello world 3</h1>')
})

module.exports = router;