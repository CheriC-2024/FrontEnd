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
import NetInfo from '@react-native-community/netinfo';

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

  // 연결 상태를 boolean 타입으로만 정의
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // null 대신 기본값을 설정
      setIsConnected(state.isConnected || false);
      setConnectionType(state.type);
    });

    return () => unsubscribe();
  }, []);

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
        const message = 'FCM token is not available.';
        console.error(message);
        setDebugMessage(message);
        return;
      }

      try {
        const { accessToken, refreshToken, firstLogin } =
          await signInWithGoogleToken(idToken, fcmToken, deviceToken);
        console.log('isFirstLogin:', firstLogin);

        // Redux에 토큰 저장
        dispatch(setTokens({ accessToken, refreshToken }));

        if (firstLogin) {
          navigation.replace('Signup');
        } else {
          await dispatch(fetchAndSetUserData());
          navigation.replace('Tabs');
        }
        setDebugMessage(`Sign-in successful. First login: ${firstLogin}`);
      } catch (apiError: any) {
        // API 에러 디버깅 추가
        if (apiError.response) {
          setDebugMessage(
            `API Response Error: ${apiError.response.status} - ${apiError.response.data.message}`,
          );
          console.error('API Response Error:', apiError.response.data);
        } else if (apiError.request) {
          setDebugMessage(
            'API Request Error: No response received from server.',
          );
          console.error('API Request Error:', apiError.request);
        } else {
          setDebugMessage(`API Unknown Error: ${apiError.message}`);
          console.error('API Unknown Error:', apiError.message);
        }
      }
    } catch (error: any) {
      // Google Sign-In 에러 디버깅 추가
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setDebugMessage('Google Sign-In was cancelled.');
        console.error('Google Sign-In was cancelled.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setDebugMessage('Google Sign-In is already in progress.');
        console.error('Google Sign-In is already in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setDebugMessage('Google Play Services not available or outdated.');
        console.error('Google Play Services not available or outdated.');
      } else {
        setDebugMessage(`Google Sign-In Error: ${error.message}`);
        console.error('Google Sign-In Error:', error);
      }
    }
  };

  return (
    <Container>
      <SplashIcon />
      <Button onPress={signInWithGoogle}>
        <GoogleIcon />
        <ButtonText>{`   `}Sign up with Google</ButtonText>
      </Button>
      {/* <H5>{debugMessage}</H5>
      <H5>Connection Type: {connectionType}</H5>
      <H5>Connection Type: {connectionType}</H5>
      <H5>Is Connected: {isConnected ? 'Yes' : 'No'}</H5> */}
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
