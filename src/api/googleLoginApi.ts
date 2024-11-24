import axiosInstance from './axiosInstance';

export const signInWithGoogleToken = async (idToken, fcmToken, deviceToken) => {
  try {
    const response = await axiosInstance.get('/users/google-login', {
      headers: {
        'id-token': idToken,
        'device-token': deviceToken,
        'fcm-token': fcmToken,
      },
    });

    const { accessToken, refreshToken, firstLogin } = response.data.data;
    console.log(accessToken);
    return { accessToken, refreshToken, firstLogin };
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};

export const checkNicknameAvailability = async (nickname) => {
  try {
    const response = await axiosInstance.get('/users/name', {
      params: { name: nickname },
    });

    if (response.data.code === 200 && response.data.message === 'OK') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking nickname availability:', error);
    throw error;
  }
};

export const signUp = async (signupData) => {
  try {
    const response = await axiosInstance.post('/users', signupData);
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};
