import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    resourceType: {
      type: String,
      enum: ["image", "video", "raw", "auto"],
      default: "auto",
    },
    uploadedBy: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const FileModel = mongoose.model("File", fileSchema);

export default FileModel;
