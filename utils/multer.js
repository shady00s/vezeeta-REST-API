import multer, { memoryStorage } from 'multer'

const storage = memoryStorage()

const upload = multer({
    storage:storage
})

export default upload

// storage example
// const path = require('path')

// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: './public/uploads/doctors-images',
//     filename: function (req, file, cb) {
//         cb(null, 'admin' + '-' + req.body.adminName + '-' + Date.now() + path.extname(file.originalname));
//     }
// })

// // setting up storage i
// const upload = multer({
//     storage: storage
// })