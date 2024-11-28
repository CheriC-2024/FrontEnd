import { useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Animated, Alert } from 'react-native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { useExhibitionDetails } from 'src/api/hooks/useExhibitQueries';
import { setExhibitDetails } from 'src/slices/watchingExhibitSlice';
import { useDispatch } from 'react-redux';

const ExhibitLoading: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { exhibitId } = route.params || {}; // 전시 ID 가져오기
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

      // 3초 후 ExhibitIntro로 이동
      const timer = setTimeout(() => {
        navigation.replace('ExhibitIntro', { exhibitionDetails });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [exhibitionDetails, isError, navigation]);

  return (
    <GradientBackground>
      <OverlayBackground>
        <AnimatedTicketIcon
          source={require('src/assets/ticket_lottie.png')}
          style={{ opacity: fadeAnim }}
        />
      </OverlayBackground>
    </GradientBackground>
  );
};

export default ExhibitLoading;

const GradientBackground = styled(LinearGradient).attrs({
  colors: ['#1F2C35', '#49A0BE', '#95BFC4', '#E2DFCA'],
  start: { x: 0.5, y: 0 },
  end: { x: 0.5, y: 0.8 },
})`
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

const AnimatedTicketIcon = styled(Animated.Image)`
  width: 140px;
  height: 150px;
`;
