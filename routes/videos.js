const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')
const path = require('path')


const videoStorage = multer.diskStorage({
    destination: './public/images-video',
    filename: (req, file, cb) => {
     cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }})
 
 const upload = multer({
     storage: videoStorage,
     limits:{fileSize: 10000000},  //10mb the limit
 }).single('image')

//Reading the data from the JSON file
const data = fs.readFileSync('./data/videos.json', 'utf8')

//Transforming the JSON data into an array of objects
const dataAsObject = Array.from(JSON.parse(data))

// console.log(dataAsObject.find((item) => item.id == "84e96018-4022-434e-80bf-000ce4cd12b8"))

//Route that gets all the videos of the list
router.get('/', (req, res) =>{
    res.json(dataAsObject)
})

//Route that gets all the details of one video of the list based in the id
router.get('/:id', (req, res) =>{
    const oneVideo = dataAsObject.find((item) => item.id == req.params.id)
    res.json(oneVideo)
})

let imageFilename = ''

//uploading images
router.post('/upload', (req,res) =>{
    upload(req, res, () => {
        if (req.file == undefined){
            console.log(5)
            res.send('Issues uploading the Image. Try again')
        } else {
           
            imageFilename = req.file.filename
            res.json(req.file.filename)
           
                       
        }
    } 
)})


//Route that post the upload video information
router.post('/', (req, res) =>{
    //I need to check if the req.body has included the file name on the image property that
    //way it also takes the current upload image based on his name
    const fileExtension = imageFilename.split('.').pop().toLowerCase()
    console.log(fileExtension)
    if (fileExtension == 'mp4') {
        req.body.image = `http://localhost:8080/imageDefaultThumbnail.jpg`
        req.body.video =  `http://localhost:8080/${imageFilename}`
        dataAsObject.push(req.body)
        const dataAsString = JSON.stringify(dataAsObject, null, 2)
        fs.writeFileSync('./data/videos.json', dataAsString, 'utf8')
        res.json(console.log(req.body))
    } else {
        req.body.image = `http://localhost:8080/${imageFilename}`
        console.log(req.body.image)
    dataAsObject.push(req.body)
    const dataAsString = JSON.stringify(dataAsObject, null, 2)
    fs.writeFileSync('./data/videos.json', dataAsString, 'utf8')
    res.json(console.log(req.body))
    }
    
})



//Route that post a comment for one of the video of the list
router.post('/:id/comments', (req, res) =>{
    const oneVideo = dataAsObject.find((item) => item.id == req.params.id)
    oneVideo.comments.push(req.body)
    const dataAsString = JSON.stringify(dataAsObject, null, 2)
    fs.writeFileSync('./data/videos.json', dataAsString, 'utf8')
    res.json(console.log('post comment'))
})

// Route that delete a comment for one of the video of the list based on the id of the comment
router.delete('/:videoId/comments/:commentId', (req, res) =>{
    const oneVideo = dataAsObject.find((item) => item.id == req.params.videoId)
    const indexComment = oneVideo.comments.findIndex((item) => item.id == req.params.commentId)
    oneVideo.comments.splice(indexComment)
    const dataAsString = JSON.stringify(dataAsObject, null, 2)
    fs.writeFileSync('./data/videos.json', dataAsString, 'utf8')
    res.json(console.log('delete comment'))
})

// Route that update like on comment for one of the video of the list based on the id of the comment
router.put('/:videoId/likes', (req, res) =>{
    const oneVideo = dataAsObject.find((item) => item.id == req.params.videoId)
    oneVideo.likes = req.body.likes
    const dataAsString = JSON.stringify(dataAsObject, null, 2)
    fs.writeFileSync('./data/videos.json', dataAsString, 'utf8')
    res.json(console.log('like video'))
})
// When someone submit the upload form it post all the object info (including the image source folder
//on the express app and the name of the image). This also means that we should create a parallel process that when 
//an image is uploaded get send to this folder on express.app
module.exports = router;