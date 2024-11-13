// LoginScreen.js
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { WEB_CLIENT_ID } from '@env';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/StackNavigator';
import { GoogleIcon } from 'src/assets/icons/_index';
import { H1, Subtitle2 } from '../../styles/typography';
import { signInWithGoogleToken } from 'src/api/googleLoginApi';
import { setTokens } from 'src/slices/authSlice';
import { useDispatch } from 'react-redux';
import store from 'src/store';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.idToken;

      try {
        const { accessToken, refreshToken, firstLogin } =
          await signInWithGoogleToken(idToken);
        console.log('isFirstLogin', firstLogin);

        // Redux에 토큰값 저장
        dispatch(setTokens({ accessToken, refreshToken }));

        if (firstLogin) {
          navigation.replace('Signup');
        } else {
          navigation.replace('Tabs');
        }
      } catch (apiError) {
        console.error('API error during sign-in:', apiError);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google sign-in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google sign-in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play services not available or outdated');
      } else {
        console.error('Error signing in with Google:', error);
      }
    }
  };

  return (
    <Container>
      <Title>CheriC</Title>
      <Button onPress={signInWithGoogle}>
        <GoogleIcon />
        <ButtonText>{`   `}Sign up with Google</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.cherryRed_10};
`;

const Title = styled(H1)`
  margin-top: 250px;
  margin-bottom: 350px;
  color: ${({ theme }) => theme.colors.white};
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 32px;
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: ${({ theme }) => theme.colors.white};
`;

const ButtonText = styled(Subtitle2)``;

export default LoginScreen;
