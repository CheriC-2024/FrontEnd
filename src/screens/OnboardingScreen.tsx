import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Dimensions, Image, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { theme } from '../styles/theme';

const { width } = Dimensions.get('window');

const pages = [
  {
    title: '아트 컬렉팅',
    subtitle: '체리시에 온라인 아트 컬렉팅을 해보아요. 신진 작가분들의 유료, 무료 작품들을 만날 수 있어요!',
    image: require('../assets/images/onboarding.png'),
  },
  {
    title: '소장 작품 등록',
    subtitle: '이미 미술 작품을 소유하고 계시나요? 체리시에 소장 인증하고 전시까지 진행해보아요',
    image: require('../assets/images/onboarding.png'),
  },
  {
    title: '온라인 컬렉션 전시',
    subtitle: '너의 취향을 담은 컬렉션으로 전시를 만들고 다른 컬렉터들과 말썽 전시로 소통해요!',
    image: require('../assets/images/onboarding.png'),
  },
  {
    title: '작품 수익창출',
    subtitle: '작가분들은 체리시에 작품을 등록하여 수익을 낼 수 있어요!',
    image: require('../assets/images/onboarding.png'),
    isLastPage: true, // 마지막 페이지인지 여부를 나타내는 필드 추가
  },
];

const OnboardingScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation(); // 네비게이션 훅 사용

  const handleScroll = (event: any) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(pageIndex);
  };

  const handleSkip = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: width * (pages.length - 1), animated: true });
      setCurrentPage(pages.length - 1);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login'); // 'LoginScreen'으로 이동
  };

  return (
    <Container>
      <DotsWrapper>
        {pages.map((_, i) => (
          <Dots key={i} selected={i === currentPage} />
        ))}
      </DotsWrapper>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      >
        {pages.map((page, i) => (
          <Page key={i}>
            <StyledImage source={page.image} />
            <Title>{page.title}</Title>
            <Subtitle>{page.subtitle}</Subtitle>
            {page.isLastPage && (
              <ButtonWrapper>
                <Button title="Cheric 로그인 하기" onPress={handleLogin} color={theme.colors.cherryRed_10} />
              </ButtonWrapper>
            )}
          </Page>
        ))}
      </ScrollView>
      <SkipButton onPress={handleSkip}>
        <SkipButtonText>SKIP ></SkipButtonText>
      </SkipButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.grey_4};
  position: relative;
`;

const DotsWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;
  width: 100%;
`;

const Dots = styled.View<{ selected: boolean }>`
  width: ${props => props.theme.spacing.s2};
  height: ${props => props.theme.spacing.s2};
  border-radius: ${props => props.theme.spacing.s2};
  margin-horizontal: ${props => props.theme.spacing.s1};
  background-color: ${props => (props.selected ? theme.colors.cherryRed_10 : theme.colors.grey_6)};
`;

const Page = styled.View`
  width: ${width}px;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  background-color: #ccc;
`;

const Title = styled.Text`
  font-size: ${props => props.theme.fontSizes.h4};
  font-weight: bold;
  color: ${props => props.theme.colors.redBlack};
  margin-bottom: ${props => props.theme.spacing.s3};
`;

const Subtitle = styled.Text`
  font-size: ${props => props.theme.fontSizes.body1};
  color: ${props => props.theme.colors.grey_6};
  text-align: center;
  padding-horizontal: ${props => props.theme.spacing.s5};
`;

const ButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.s5};
  align-items: center;
`;

const SkipButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 30px;
`;

const SkipButtonText = styled.Text`
  font-size: ${props => props.theme.fontSizes.body2};
  color: ${props => props.theme.colors.cherryRed_10};
`;

export default OnboardingScreen;
