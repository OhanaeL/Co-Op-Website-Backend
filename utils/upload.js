const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB max file size
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
        cb(null, true);
        } else {
        cb(new Error('Only PDF files are allowed.'));
        }
    }
});

module.exports = upload;