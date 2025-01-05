import axios from "axios";
import * as FileSystem from 'expo-file-system';

export const UploadToCloudinary = async (imageUri) => {
  const CLOUD_NAME = "djv8iakx3";
  const UPLOAD_PRESET = "event_management";

  try {
    // First, verify the file exists and log its info
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    console.log("File info:", fileInfo);

    if (!fileInfo.exists) {
      throw new Error("File doesn't exist at path: " + imageUri);
    }

    // Create the form data
    const formData = new FormData();
    
    // Append the file using a proper filename and type
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg'
    });
    
    formData.append('upload_preset', UPLOAD_PRESET);

    // Log the request we're about to make
    console.log("Preparing to upload to:", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);
    console.log("FormData keys:", [...formData._parts.map(part => part[0])]);

    // Make the request with detailed error handling
    const result = await axios({
      method: 'post',
      url: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      data: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      // Add timeout and show upload progress
      timeout: 30000,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log("Upload progress:", percentCompleted, "%");
      }
    });

    console.log("Upload successful:", result.data);
    return result.data.secure_url;

  } catch (error) {
    // Enhanced error logging
    console.error("Upload failed with error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      config: error.config
    });

    if (error.code === 'ECONNABORTED') {
      throw new Error('Upload timed out. Please check your internet connection.');
    }
    
    if (error.response) {
      // The server responded with a status code outside of 2xx
      throw new Error(`Server error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request
      throw new Error(`Error setting up the request: ${error.message}`);
    }
  }
};