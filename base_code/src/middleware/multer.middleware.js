import multer from "multer";

// Khởi tạo tùy chọn lưu trữ memoryStorage

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;
