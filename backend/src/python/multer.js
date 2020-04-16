const multer = require('multer');
exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'python/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})

exports.upload = multer({ storage: this.storage });