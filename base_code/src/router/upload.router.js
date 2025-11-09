import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import {
  uploadSingleToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
} from "../config/cloudinary.config.js";

const uploadRouter = Router();

uploadRouter.post("/", upload.single("file"), async (req, res) => {
  // Truy cập dữ liệu tệp từ req.file
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "Không có tệp được tải lên." });
  }
  const result = await uploadSingleToCloudinary(file);

  // Save to MongoDB

  // Trả về phản hồi với thông tin về tệp đã tải lên
  res.json({
    message: "Tệp được tải lên thành công.",
    link: result.url,
    publicId: result.public_id,
  });
});

uploadRouter.post("/multiple", upload.array("files"), async (req, res) => {
  const files = req.files;
  const results = await uploadMultipleToCloudinary(files);
  res.json({
    message: "Tệp được tải lên thành công.",
    links: results.map((result) => result.url),
  });
});

uploadRouter.delete("/:publicId", async (req, res) => {
  const publicId = req.params.publicId;
  const result = await deleteFromCloudinary(publicId);
  if (result) {
    res.json({
      message: "Tệp đã được xóa thành công.",
    });
  } else {
    res.status(400).json({
      message: "Xóa tệp không thành công.",
    });
  }
});
export default uploadRouter;
