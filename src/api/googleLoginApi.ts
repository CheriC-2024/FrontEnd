import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axiosInstance from './axiosInstance';

export const signInWithGoogleToken = async (idToken, fcmToken, deviceToken) => {
  try {
    const response = await axiosInstance.get('/users/google-login', {
      headers: {
        'id-token': idToken,
        'device-token': deviceToken,
        'fcm-token': fcmToken,
      },
      timeout: 5000,
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

// Google 로그아웃
export const googleSignOut = async () => {
  try {
    await GoogleSignin.signOut(); // Google 계정 로그아웃
    console.log('Google account signed out.');
  } catch (error) {
    console.error('Error during Google sign-out:', error);
    throw error;
  }
};

// 서버 로그아웃
export const logoutFromServer = async () => {
  try {
    const response = await axiosInstance.delete('/users/google-logout'); // 서버 로그아웃 API 호출
    console.log('Logged out from server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error during server logout:', error);
    throw error;
  }
};
