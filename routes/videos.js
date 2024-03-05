const express = require('express')
const router = express.Router()



router.get('/', (req, res) =>{
    res.send('<h1>hello world 3</h1>')
})

router.get('/:id', (req, res) =>{
    res.send('<h1>hello world 35</h1>')
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