import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory
export default upload;