import axiosInstance from './axiosInstance';

export const signInWithGoogleToken = async (idToken) => {
  try {
    const response = await axiosInstance.get('/users/google-login', {
      headers: {
        'id-token': idToken,
        'device-token': '1234', // Temporary device token
        'fcm-token': '1234', // Temporary FCM token
      },
    });

    const { accessToken, refreshToken, firstLogin } = response.data.data;

    return { accessToken, refreshToken, firstLogin };
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};
