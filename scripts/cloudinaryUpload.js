// utils/cloudinaryUpload.js
const cloudinary = require('./cloudinaryConfig');

async function uploadRawFile(filePath, folder = 'uploads') {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: 'raw',
    });
    return result.secure_url;
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    throw err;
  }
}

module.exports = { uploadRawFile };
