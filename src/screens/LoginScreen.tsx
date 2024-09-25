import React, { useEffect } from 'react';
import { Image } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { H1, Subtitle2 } from '../styles/typography';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.theme.colors.cherryRed_10};
`;

const Title = styled(H1)`
  color: ${(props) => props.theme.colors.white};
  margin-top: 180px;
  margin-bottom: 300px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.white};
  padding: 12px 28px;
  border-radius: ${(props) => props.theme.radius.l};
  flex-direction: row;
`;

const ButtonText = styled(Subtitle2)``;

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
        <Image
          source={require('src/assets/google-logo.png')}
          style={{ width: 24, height: 23 }}
        />
        <ButtonText>{`   `}Sign up with Google</ButtonText>
      </Button>
    </Container>
  );
};

export default LoginScreen;
