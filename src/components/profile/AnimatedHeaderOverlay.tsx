import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

interface AnimatedHeaderOverlayProps {
  artistName: string;
  artworkCount: number;
  backgroundImage: string;
  scrollY: Animated.Value;
}

const AnimatedHeaderOverlay: React.FC<AnimatedHeaderOverlayProps> = ({
  artistName,
  artworkCount,
  backgroundImage,
  scrollY,
}) => {
  // scrollY를 사용하여 애니메이션 값 계산
  const backgroundTranslateY = scrollY.interpolate({
    inputRange: [0, 90],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const backgroundLayerOpacity = scrollY.interpolate({
    inputRange: [80, 110],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTextOpacity = scrollY.interpolate({
    inputRange: [130, 170],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [70, 140],
    outputRange: [70, 0],
    extrapolate: 'clamp',
  });

  return (
    <Container>
      {/* 배경 이미지 */}
      <BackgroundImageContainer
        style={{ transform: [{ translateY: backgroundTranslateY }] }}
      >
        <BackgroundImage source={{ uri: backgroundImage }} />
      </BackgroundImageContainer>

      {/* 그라데이션 오버레이 */}
      <GradientOverlay
        style={{ transform: [{ translateY: backgroundTranslateY }] }}
      >
        <Gradient
          colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </GradientOverlay>

      {/* 검은색 반투명 레이어 */}
      <BlackOverlay style={{ opacity: backgroundLayerOpacity }} />

      {/* 텍스트 오버레이 */}
      <HeaderTextContainer
        style={{
          opacity: headerTextOpacity,
          transform: [{ translateY: headerTranslateY }],
        }}
      >
        <ArtistName>{artistName}</ArtistName>
        <ArtworkCount>미술작품 {artworkCount}개</ArtworkCount>
      </HeaderTextContainer>
    </Container>
  );
};

export default AnimatedHeaderOverlay;

const Container = styled.View`
  position: relative;
`;

const BackgroundImageContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 170px;
  z-index: 2;
`;

const BackgroundImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const GradientOverlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 170px;
  z-index: 3;
`;

const Gradient = styled(LinearGradient)`
  height: 100%;
  width: 100%;
`;

const BlackOverlay = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 110px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
`;

const HeaderTextContainer = styled(Animated.View)`
  position: absolute;
  top: 42px;
  left: 40px;
  right: 0;
  height: 60px;
  z-index: 4;
`;

const ArtistName = styled.Text`
  color: white;
  font-size: 20px;
`;

const ArtworkCount = styled.Text`
  color: white;
  font-size: 12px;
`;
