import multer from "multer";

const storage = multer.memoryStorage();

const uploadSingle = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export { uploadSingle, uploadMultiple };
