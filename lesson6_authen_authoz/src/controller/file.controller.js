import { FileModel } from "../model/index.js";
import {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
} from "../config/cloudinary.config.js";

const fileController = {
  // Single file upload
  uploadSingle: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
      }

      // Upload to Cloudinary
      const result = await uploadToCloudinary(req.file.buffer, "uploads");

      // Save to MongoDB
      const fileData = new FileModel({
        fileName: result.public_id,
        originalName: req.file.originalname,
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        resourceType: result.resource_type,
        uploadedBy: req.body.uploadedBy || null,
      });

      await fileData.save();

      res.status(201).send({
        message: "File uploaded successfully",
        data: fileData,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).send({
        message: "Error uploading file",
        error: error.message,
      });
    }
  },

  // Multiple files upload
  uploadMultiple: async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).send({ message: "No files uploaded" });
      }

      // Upload all files to Cloudinary
      const cloudinaryResults = await uploadMultipleToCloudinary(
        req.files,
        "uploads"
      );

      // Save all files to MongoDB
      const fileDataArray = cloudinaryResults.map((result, index) => ({
        fileName: result.public_id,
        originalName: req.files[index].originalname,
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        resourceType: result.resource_type,
        uploadedBy: req.body.uploadedBy || null,
      }));

      const savedFiles = await FileModel.insertMany(fileDataArray);

      res.status(201).send({
        message: "Files uploaded successfully",
        count: savedFiles.length,
        data: savedFiles,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).send({
        message: "Error uploading files",
        error: error.message,
      });
    }
  },

  // Get all files
  getAllFiles: async (req, res) => {
    try {
      const files = await FileModel.find().sort({ createdAt: -1 });
      res.status(200).send({
        message: "Files retrieved successfully",
        count: files.length,
        data: files,
      });
    } catch (error) {
      console.error("Get files error:", error);
      res.status(500).send({
        message: "Error retrieving files",
        error: error.message,
      });
    }
  },
};

export default fileController;
