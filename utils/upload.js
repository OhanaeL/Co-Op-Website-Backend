const multer = require('multer');
const storage = multer.memoryStorage(); // store files in memory for cloudinary upload
const upload = multer({ storage });

module.exports = upload;
