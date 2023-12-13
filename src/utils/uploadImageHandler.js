/* eslint-disable import/namespace */
/**
 * Explain parameters of function
 * path: Là đường dẫn đến route để upload image
 * uri: Dùng thư viện expo-image-picker để lấy ra uri
 * fieldName: Tức là field trên swagger nó nhận ví dụ như avatar,image,....
 * accessToken: Chắc là mọi người tự hiểu cái này làm gì
 */

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
