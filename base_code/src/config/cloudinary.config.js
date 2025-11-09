import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLD_NAME,
  api_key: process.env.CLD_API_KEY,
  api_secret: process.env.CLD_API_SECRET,
});

const uploadSingleToCloudinary = async (file) => {
  //convert fileBuffer to dataUrl
  const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;
  //Get original name file
  const fileName = file.originalname.split(".")[0];

  //upload to cloudinary
  return await cloudinary.uploader.upload(
    dataUrl,
    {
      public_id: fileName,
      resource_type: "auto",
    },
    (err, result) => {
      if (err) {
        throw err;
      } else {
        return result;
      }
    }
  );
};

const uploadMultipleToCloudinary = async (files) => {
  const uploadPromises = files.map((file) => uploadSingleToCloudinary(file));
  return Promise.all(uploadPromises);
};

const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId, (err, result) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

const deleteMultipleFromCloudinary = async (publicIds) => {
  const deletePromises = publicIds.map((publicId) =>
    deleteFromCloudinary(publicId)
  );
  return Promise.all(deletePromises);
};
export {
  uploadSingleToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
  deleteMultipleFromCloudinary,
};
