import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Dimensions, Image, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { theme } from '../styles/theme';
import { Body2, ButtonText, H3 } from 'src/styles/typography';
import { BtnText } from 'src/components/Button';

const { width } = Dimensions.get('window');

const pages = [
  {
    title: '아트 컬렉팅',
    subtitle: `체리시에 온라인 아트 컬렉팅을 해보아요.${'\n'}신진 작가분들의 유료, 무료 작품들을 만날 수 있어요!`,
    image: require('../assets/images/Character/character_front.png'),
  },
  {
    title: '소장 작품 등록',
    subtitle: `이미 미술 작품을 소유하고 계시나요?${'\n'}체리시에 소장 인증하고 전시까지 진행해보아요`,
    image: require('../assets/images/Character/character_front.png'),
  },
  {
    title: '온라인 컬렉션 전시',
    subtitle: `너의 취향을 담은 컬렉션으로 전시를 만들고${'\n'}다른 컬렉터들과 컬렉션 전시로 소통해요!`,
    image: require('../assets/images/Character/character_front.png'),
  },
  {
    title: '작품 수익창출',
    subtitle: `작가님들은 체리시에 작품을 등록하여${'\n'}수익을 낼 수 있어요!`,
    image: require('../assets/images/Character/character_front.png'),
    isLastPage: true, // 마지막 페이지인지 여부를 나타내는 필드 추가
  },
];

const OnboardingScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(false); // 버튼의 가시성 상태
  const opacity = useRef(new Animated.Value(0)).current; // 애니메이션 초기값
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation(); // 네비게이션 훅 사용

  const handleScroll = (event: any) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentPage(pageIndex);
  };

  const handleSkip = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: width * (pages.length - 1), // 마지막 페이지로 바로 이동
        animated: true, // 애니메이션 적용
      });
      setCurrentPage(pages.length - 1); // 현재 페이지를 마지막 페이지로 설정
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login'); // 'LoginScreen'으로 이동
  };

  useEffect(() => {
    if (pages[currentPage].isLastPage) {
      // 2초 후에 버튼이 나타나도록 설정
      setTimeout(() => {
        setIsButtonVisible(true);
        // 애니메이션 실행
        Animated.timing(opacity, {
          toValue: 1, // 최종 투명도
          duration: 500, // 애니메이션 지속 시간 (서서히 등장)
          useNativeDriver: true,
        }).start();
      }, 1000); // 2초 후에 버튼 표시
    } else {
      setIsButtonVisible(false);
      opacity.setValue(0); // 페이지 변경 시 애니메이션 초기화
    }
  }, [currentPage]);

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
            <ImageContainer>
              <StyledImage source={page.image} />
            </ImageContainer>
            <TextContainer>
              <Title>{page.title}</Title>
              <Subtitle>{page.subtitle}</Subtitle>
            </TextContainer>
          </Page>
        ))}
      </ScrollView>

      {/* currentPage가 마지막 페이지가 아닐 때만 SkipButton을 렌더링 */}
      {!pages[currentPage].isLastPage ? (
        <SkipButton onPress={handleSkip}> 
          <SkipButtonText>SKIP ></SkipButtonText>
        </SkipButton>
      ) : isButtonVisible && (
        <AnimatedButtonWrapper style={{ opacity }}>
          <TouchableOpacity onPress={handleLogin}>
            <BtnText>CheriC 로그인 하기</BtnText>
          </TouchableOpacity>
        </AnimatedButtonWrapper>
      )}
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
  top: 60px;
  width: 100%;
`;

const Dots = styled.View<{ selected: boolean }>`
  width: ${props => props.theme.spacing.s3};
  height: ${props => props.theme.spacing.s3};
  border-radius: ${props => props.theme.spacing.s3};
  margin-horizontal: ${props => props.theme.spacing.s3};
  background-color: ${props => (props.selected ? theme.colors.cherryRed_10 : theme.colors.white)};
`;

const Page = styled.View`
  width: ${width}px;
  align-items: center;
  padding: 20px 0;
`;

const StyledImage = styled.Image`
  width: 175px;
  height: 250px;
`;

const ImageContainer = styled.View`
  margin-top: 100px;
  margin-bottom: 80px;
  align-items: center;
  background-color: ${({theme})=>theme.colors.grey_4};
`;

const TextContainer = styled.View`
  width: ${width}px;
  height: 400px;
  padding-top: 50px;
  align-items: center;
  background-color: ${({theme})=>theme.colors.white};
`;

const Title = styled(H3)`
  margin-bottom: ${props => props.theme.spacing.s5};
`;

const Subtitle = styled(Body2)`
  color: ${props => props.theme.colors.grey_8};
  text-align: center;
  padding: 0 ${props => props.theme.spacing.s8};
`;

const AnimatedButtonWrapper = styled(Animated.View)`
  position: absolute;
  bottom: 140px;
  right: 115px;
  align-items: center;
  padding: 12px 20px;
  border-radius: ${({theme})=>theme.radius.l};
  background-color: ${({theme})=>theme.colors.redBlack};
`;

const SkipButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 160px;
  right: 180px;
`;

const SkipButtonText = styled(ButtonText)`
  color: ${props => props.theme.colors.grey_6};
`;

export default OnboardingScreen;
