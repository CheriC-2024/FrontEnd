import React, { useEffect } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { H1 } from '../styles/typography';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.cherryRed_10};
`;

const Title = styled(H1)`
  color: ${(props) => props.theme.colors.white};
  margin-bottom: ${(props) => props.theme.spacing.s10};
`;

const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.white};
  padding-horizontal: ${(props) => props.theme.spacing.s4};
  padding-vertical: ${(props) => props.theme.spacing.s2};
  border-radius: ${(props) => props.theme.radius.s};
`;

const ButtonText = styled.Text`
  color: ${(props) => props.theme.colors.cherryRed_10};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-family: ${(props) => props.theme.fonts.regular};
`;

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
        <ButtonText>회원가입</ButtonText>
      </Button>
    </Container>
  );
};

export default LoginScreen;
