const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')
const path = require('path')

//Adding on the middleware multer a destination and a way to name the uploaded files
const videoStorage = multer.diskStorage({
    destination: './public/images-video',
    filename: (req, file, cb) => {
     cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }})
 
 const upload = multer({
     storage: videoStorage,
     limits:{fileSize: 30000000},  //30mb the max-size of upcoming file
 }).single('image')

//Reading the data from the JSON file
const data = fs.readFileSync('./data/videos.json', 'utf8')

//Transforming the JSON data into an array of objects
const dataAsObject = Array.from(JSON.parse(data))  

//Route that gets all the videos of the list
router.get('/', (req, res) =>{
    res.json(dataAsObject)
})

//Route that gets all the details of one video of the list based in the id
router.get('/:id', (req, res) =>{
    const oneVideo = dataAsObject.find((item) => item.id == req.params.id)
    res.json(oneVideo)
})

//uploading images
let imageFilename = ''
router.post('/upload', (req,res) =>{
    upload(req, res, () => {
        if (req.file == undefined){
            res.send('Issues uploading the Image. Try again')
        } else {
            imageFilename = req.file.filename
            res.json(req.file.filename)
                              
        }
    } 
)})


//Route that post the upload video information and based in the file extension (if it is a video or image)
//will change what is posted as image and as video.
router.post('/', (req, res) =>{
    const fileExtension = imageFilename.split('.').pop().toLowerCase()
    if (fileExtension == 'mp4' || fileExtension == 'avi') {
        req.body.image = `http://localhost:8080/imageDefaultThumbnail.jpg`
        req.body.video =  `http://localhost:8080/${imageFilename}`
        dataAsObject.push(req.body)
        const dataAsString = JSON.stringify(dataAsObject, null, 2)
        fs.writeFileSync('./data/videos.json', dataAsString, 'utf8')
        res.json(req.body)
    } else {
        req.body.image = `http://localhost:8080/${imageFilename}`
        
    dataAsObject.push(req.body)
    const dataAsString = JSON.stringify(dataAsObject, null, 2)
    fs.writeFileSync('./data/videos.json', dataAsString, 'utf8')
    res.json(req.body)
    }
    
})



//Route that post a comment for one of the video of the list
router.post('/:id/comments', (req, res) =>{
    const oneVideo = dataAsObject.find((item) => item.id == req.params.id)
    oneVideo.comments.push(req.body)
    const dataAsString = JSON.stringify(dataAsObject, null, 2)
    fs.writeFileSync('./data/videos.json', dataAsString, 'utf8')
    res.json('post comment')
})

// Route that delete a comment for one of the video of the list based on the id of the comment
router.delete('/:videoId/comments/:commentId', (req, res) =>{
    const oneVideo = dataAsObject.find((item) => item.id == req.params.videoId)
    const indexComment = oneVideo.comments.findIndex((item) => item.id == req.params.commentId)
    oneVideo.comments.splice(indexComment)
    const dataAsString = JSON.stringify(dataAsObject, null, 2)
    fs.writeFileSync('./data/videos.json', dataAsString, 'utf8')
    res.json('delete comment')
})

// Route that update like on comment for one of the video of the list based on the id of the comment
router.put('/:videoId/likes', (req, res) =>{
    const oneVideo = dataAsObject.find((item) => item.id == req.params.videoId)
    oneVideo.likes = req.body.likes
    const dataAsString = JSON.stringify(dataAsObject, null, 2)
    fs.writeFileSync('./data/videos.json', dataAsString, 'utf8')
    res.json('like video')
})

module.exports = router;