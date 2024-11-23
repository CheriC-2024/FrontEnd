import axiosInstance from './axiosInstance';

// Pre-signed URL 요청
export const getPresignedUrls = async (
  fileInfos: { path: string; name: string; size: number }[],
) => {
  try {
    const response = await axiosInstance.post('/files/presigned-url', {
      fileInfos,
    });
    console.log(response.data.data.urls);
    return response.data.data.urls; // Pre-signed URL 정보 반환
  } catch (error) {
    console.error('Pre-signed URL 요청 실패:', error);
    throw error;
  }
};

// S3 업로드
export const uploadFileToS3 = async (url: string, file: Blob) => {
  try {
    console.log('Uploading to S3. URL:', url);
    console.log('Blob details:', file);

    const response = await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type, // Ensure Content-Type is set correctly
      },
    });

    if (!response.ok) {
      console.error('S3 upload failed:', response);
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    console.log('S3 upload successful');
    return true; // Indicate success
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error; // Propagate error to caller
  }
};
