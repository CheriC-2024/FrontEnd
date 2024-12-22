import { useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Animated, Alert } from 'react-native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { useExhibitionDetails } from 'src/api/hooks/useExhibitQueries';
import { setExhibitDetails } from 'src/slices/watchingExhibitSlice';
import { useDispatch } from 'react-redux';
import { getGradientConfig } from 'src/utils/gradientBgUtils';
import { getFontFamilyByValue } from 'src/utils/fontUtils';
import React from 'react';

const ExhibitLoading: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { exhibitId, exhibitColors, bgType, name, coverImgUrl, font } =
    route.params || {}; // 전시 ID 가져오기
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // TanStack Query로 데이터 가져오기
  const {
    data: exhibitionDetails,
    isLoading,
    isError,
  } = useExhibitionDetails(exhibitId);

  useEffect(() => {
    if (exhibitionDetails) {
      dispatch(setExhibitDetails(exhibitionDetails));
      console.log(exhibitionDetails);
    }
    if (isError) {
      Alert.alert('Error', 'Failed to load exhibition details.');
    }
  }, [exhibitionDetails, isError, dispatch]);

  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        iconColor: 'transparent',
        headerTransparent: true,
      }),
    );

    // 이미지 페이드 인 애니메이션
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [navigation, fadeAnim]);

  useEffect(() => {
    if (isError) {
      Alert.alert('Error', 'Failed to load exhibition details.');
      navigation.goBack();
    }

    if (exhibitionDetails) {
      console.log('Exhibition Details:', exhibitionDetails);
      const exhibitFont = getFontFamilyByValue(exhibitionDetails.font);
      console.log(name);

      // 3초 후 ExhibitIntro로 이동
      const timer = setTimeout(() => {
        navigation.replace('ExhibitIntro', {
          exhibitionDetails,
          exhibitId: exhibitId,
          bgType: bgType,
          exhibitColors: exhibitColors,
          exhibitFont: font,
          name: name,
          coverImgUrl: coverImgUrl,
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [exhibitionDetails, isError, navigation]);

  // Gradient 설정
  const gradientConfig = getGradientConfig(bgType);

  const renderContent = () => (
    <>
      <OverlayBackground>
        <AnimatedTicketIcon
          source={require('src/assets/ticket_lottie.png')}
          style={{ opacity: fadeAnim }}
        />
      </OverlayBackground>
    </>
  );
  return (
    <>
      {coverImgUrl ? (
        <BackgroundImageContainer source={{ uri: coverImgUrl }}>
          <Content>{renderContent()}</Content>
        </BackgroundImageContainer>
      ) : exhibitColors && exhibitColors.length > 0 ? (
        <GradientBackground
          colors={exhibitColors}
          start={gradientConfig.start}
          end={gradientConfig.end}
        >
          <Content>{renderContent()}</Content>
        </GradientBackground>
      ) : (
        <FallbackBackground>
          <Content>{renderContent()}</Content>
        </FallbackBackground>
      )}
    </>
  );
};

export default ExhibitLoading;

const BackgroundImageContainer = styled.ImageBackground`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
`;

const GradientBackground = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
`;

const OverlayBackground = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.redBlack_alpha80};
  z-index: 1;
  justify-content: center;
  align-items: center;
`;

const FallbackBackground = styled.View`
  flex: 1;
  background-color: #f0f0f0;
`;

const AnimatedTicketIcon = styled(Animated.Image)`
  width: 140px;
  height: 150px;
`;
