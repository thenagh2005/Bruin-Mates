const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary'); // Ensure this is correctly configured with Cloudinary API details

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'profile-pictures', // The folder in Cloudinary to store images
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'] // Allowed file formats
    },
});


const upload = multer({ storage });

// Middleware function to handle uploads
const uploadSingle = upload.single('profilePicture');

const multerMiddleware = (req, res, next) => {
    uploadSingle(req, res, (err) => {
        if (err) {
            console.error('Error in Multer middleware:', err); // Log multer errors
            return res.status(500).json({ message: 'File upload error', error: err.message });
        }

        // Log file details after successful processing
        if (req.file) {
            console.log('File uploaded successfully:', req.file); // Log the file metadata
        } else {
            console.log('No file provided in the request'); // Log if no file is uploaded
        }

        // Proceed to the next middleware/controller
        next();
    });
};

module.exports = multerMiddleware;
