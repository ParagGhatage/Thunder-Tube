import path from 'path'
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'temp'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
