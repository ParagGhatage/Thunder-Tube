import multer from 'multer';
import path from 'path';

// Define absolute path to temp directory
const tempDir = path.join(__dirname, 'public', 'temp');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir); // Use absolute path
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep original filename
  }
});

// Initialize Multer with the configured storage
export const upload = multer({ storage: storage });
