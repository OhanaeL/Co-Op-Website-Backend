const cloudinary = require('./cloudinaryConfig');

async function uploadImageStory(base64data) {
    try {
        const result = await cloudinary.uploader.upload(base64data, {
        folder: 'success_stories', // optional folder in Cloudinary
        });
        return result.secure_url; // URL to store in your DB
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
}

async function uploadImageEvent(base64data) {
    try {
        const result = await cloudinary.uploader.upload(base64data, {
        folder: 'events', // optional folder in Cloudinary
        });
        return result.secure_url; // URL to store in your DB
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
}

module.exports = {
    uploadImageStory,
    uploadImageEvent
};