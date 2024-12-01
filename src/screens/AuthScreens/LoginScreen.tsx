import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import { API_BASE_URL, WEB_CLIENT_ID } from '@env';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { GoogleIcon, SplashIcon } from 'src/assets/icons/_index';
import { H5, Subtitle1 } from '../../styles/typography';
import { signInWithGoogleToken } from 'src/api/googleLoginApi';
import { setTokens } from 'src/slices/authSlice';
import { useDispatch } from 'react-redux';
import { fetchAndSetUserData } from 'src/api/userApi';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();

  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [deviceToken, setDeviceToken] = useState<string | null>(null);

  const [debugMessage, setDebugMessage] = useState<string>(''); // Debug 메시지 상태 추가

  useEffect(() => {
    // Google Sign-in 초기화
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });

    // FCM 토큰 가져오기
    const fetchFcmToken = async () => {
      try {
        const token = await messaging().getToken();
        setFcmToken(token);
        console.log('Login page FCM Token:', token);
      } catch (error) {
        console.error('Error fetching FCM token:', error);
      }
    };
    //디바이스 토큰
    const fetchDeviceToken = async () => {
      try {
        const token = await DeviceInfo.getUniqueId();
        setDeviceToken(token);
        console.log('Device Token:', token);
      } catch (error) {
        console.error('Error fetching Device Token:', error);
      }
    };

    fetchFcmToken();
    fetchDeviceToken();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;

      if (!fcmToken) {
        console.error('FCM token is not available.');
        return;
      }

      try {
        const { accessToken, refreshToken, firstLogin } =
          await signInWithGoogleToken(idToken, fcmToken, deviceToken);
        console.log('isFirstLogin', firstLogin);

        // Redux에 토큰값 저장
        dispatch(setTokens({ accessToken, refreshToken }));

        if (firstLogin) {
          navigation.replace('Signup');
        } else {
          await dispatch(fetchAndSetUserData()); // redux에 유저 정보 저장
          navigation.replace('Tabs');
        }
        setDebugMessage(`Sign-in successful. First login: ${firstLogin}`);
      } catch (apiError) {
        setDebugMessage(`API error during sign-in: ${apiError.message}`);
        console.error('API error during sign-in:', apiError);
      }
    } catch (error) {
      setDebugMessage(`Google sign-in error: ${error.message}`);
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Container>
      <SplashIcon />
      <Button onPress={signInWithGoogle}>
        <GoogleIcon />
        <ButtonText>{`   `}Sign up with Google</ButtonText>
      </Button>
      <H5>{debugMessage}</H5>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-top: 120px;
  background-color: ${({ theme }) => theme.colors.cherryRed_10};
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  width: 75%;
  padding: 16px 28px;
  margin-top: 206px;
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ButtonText = styled(Subtitle1)``;

export default LoginScreen;
