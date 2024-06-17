import multer from 'multer';

// Define storage for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp'); // Set destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original filename
  }
});

// Initialize Multer with the configured storage
const upload = multer({ storage: storage }).single('avatar'); // Assuming 'avatar' is the field name

export { upload };
