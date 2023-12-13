/* eslint-disable import/namespace */
import * as FileSystem from 'expo-file-system';

export const uploadImage = async (path, uri, fieldName, accessToken) => {
  try {
    const url = `https://event-management-api-q3f5.onrender.com/api${path}`;
    const response = await FileSystem.uploadAsync(url, uri, {
      fieldName,
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response;
  } catch (error) {
    console.log('Upload Image Error:', error);
  }
};
