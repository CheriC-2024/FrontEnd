import { getPresignedUrls, uploadFileToS3 } from 'src/api/presignedApi';

interface FileInfo {
  path: string;
  name: string;
  size: number;
}

const usePresignedUpload = () => {
  // Generate presigned URLs
  const requestPresignedUrls = async (
    files: { uri: string; name: string; size: number }[],
    path: string,
  ): Promise<string[]> => {
    try {
      const fileInfos: FileInfo[] = files.map((file) => ({
        path,
        name: file.name,
        size: file.size,
      }));

      const presignedUrls = await getPresignedUrls(fileInfos);

      console.log('Presigned URLs received:', presignedUrls);

      return presignedUrls.map((item) => item.presignedUrl);
    } catch (error) {
      console.error('Error requesting presigned URLs:', error);
      throw error;
    }
  };

  // Upload files using presigned URLs
  const uploadFilesWithPresignedUrls = async (
    files: { uri: string; name: string }[],
    presignedUrls: string[],
  ): Promise<void> => {
    try {
      if (files.length !== presignedUrls.length) {
        throw new Error('Mismatch between files and presigned URLs.');
      }

      await Promise.all(
        files.map(async (file, index) => {
          const presignedUrl = presignedUrls[index];

          // Fetch the file data from the URI
          const response = await fetch(file.uri);
          const blob = await response.blob();

          console.log(`Uploading ${file.name} to ${presignedUrl}`);

          // Upload to S3
          await uploadFileToS3(presignedUrl, blob);
        }),
      );

      console.log('All files successfully uploaded.');
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  };

  // Combine the steps into a single function
  const uploadFiles = async (
    files: { uri: string; name: string; size: number }[],
    path: string,
  ): Promise<string[]> => {
    const presignedUrls = await requestPresignedUrls(files, path);
    await uploadFilesWithPresignedUrls(files, presignedUrls);
    return presignedUrls;
  };

  return { uploadFiles, requestPresignedUrls, uploadFilesWithPresignedUrls };
};

export default usePresignedUpload;
