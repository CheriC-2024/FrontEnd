import React from 'react';
import { Button, Image, TextStyle } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigations/AppNavigator';
import styled from 'styled-components/native';

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  const titleStyle: TextStyle = {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  };

  const subtitleStyle: TextStyle = {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  };

  return (
    <Onboarding
      onSkip={() => navigation.replace('MainTabs')}
      onDone={() => navigation.replace('MainTabs')}
      pages={[
        {
          backgroundColor: '#F5F5F5',
          image: <StyledImage source={require('../assets/image1.png')} />,
          title: '온보딩 페이지1',
          subtitle:
            '아트 컬렉팅\n체리시에 온라인 아트 컬렉팅을 해보아요. 신진 작가분들의 유료, 무료 작품들을 만날 수 있어요!',
          titleStyles: titleStyle,
          subTitleStyles: subtitleStyle,
        },
        {
          backgroundColor: '#F5F5F5',
          image: <StyledImage source={require('../assets/image2.png')} />,
          title: '온보딩 페이지2',
          subtitle:
            '소장 작품 등록\n이미 미술 작품을 소유하고 계시나요? 체리시에 소장 인증하고 전시까지 진행해보아요',
          titleStyles: titleStyle,
          subTitleStyles: subtitleStyle,
        },
        {
          backgroundColor: '#F5F5F5',
          image: <StyledImage source={require('../assets/image3.png')} />,
          title: '온보딩 페이지3',
          subtitle:
            '온라인 컬렉션 전시\n너의 취향을 담은 컬렉션으로 전시를 만들고 다른 컬렉터들과 말썽 전시로 소통해요!',
          titleStyles: titleStyle,
          subTitleStyles: subtitleStyle,
        },
        {
          backgroundColor: '#F5F5F5',
          image: <StyledImage source={require('../assets/image4.png')} />,
          title: '온보딩 페이지4',
          subtitle:
            '작품 수익창출\n작가분들은 체리시에 작품을 등록하여 수익을 낼 수 있어요!',
          titleStyles: titleStyle,
          subTitleStyles: subtitleStyle,
        },
      ]}
    />
  );
};

const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.View`
  margin-top: 20px;
`;

export default OnboardingScreen;
