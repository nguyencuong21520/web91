import { Router } from "express";
import { fileController } from "../controller/index.js";
import { uploadSingle, uploadMultiple } from "../config/multer.config.js";

const fileRouter = Router();

// Single file upload
fileRouter.post(
  "/upload-single",
  uploadSingle.single("file"),
  fileController.uploadSingle
);

// Multiple files upload
fileRouter.post(
  "/upload-multiple",
  uploadMultiple.array("files", 10),
  fileController.uploadMultiple
);

// Get all files
fileRouter.get("/", fileController.getAllFiles);

export default fileRouter;
