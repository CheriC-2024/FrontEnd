import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { GoogleIcon } from 'src/assets/icons/_index';
import { H1, Subtitle2 } from '../styles/typography';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID', // Add your web client ID here
    });
  }, []);

  const signInWithGoogle = async () => {
    // API 연결 전 우선 회원가입으로 이동
    navigation.replace('Signup');

    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   console.log(userInfo);
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (f.e. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    // }
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
