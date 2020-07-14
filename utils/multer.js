const multer = require('multer');
const fs = require('fs');
const path = require('path');

module.exports.multerHandler = (app) => {
    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images');
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })

    const fileFilter = (req, file, cb) => {
        if (file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false)
        }
    }

    app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
}

module.exports.clearImage = (filePath) => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => console.log(err));
}