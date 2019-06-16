
import path from 'path'
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now())
  }
});

export default multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return callback(new Error('Apenas imagens são permitidas!'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  }
});
