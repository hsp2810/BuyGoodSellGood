import multer from "multer";

// using memorystorage
const storage = multer.memoryStorage();

// using the storage
const upload = multer({ storage });

export default upload;
