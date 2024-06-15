import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    console.log("File Path to Upload:", localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("Cloudinary Response:", response);

    const cloudinaryUrl =response;
    if (!cloudinaryUrl) {
      console.error("Cloudinary URL not found in the response");
      return null;
    }

    console.log("File Uploaded to Cloudinary:", cloudinaryUrl);

    const sanitizedFilePath = path.join(localFilePath);

    fs.unlinkSync(sanitizedFilePath);
    console.log("File Unlinked Successfully");

    return cloudinaryUrl; // Return the Cloudinary URL instead of the entire response
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error.message);

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
      console.log("Failed Operation: File Unlinked");
    }

    return null;
  }
};

export { UploadOnCloudinary };
