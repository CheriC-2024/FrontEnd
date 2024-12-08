import { useRef, useEffect } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';

const useSlideAnimation = (initialHeightOffset = 0.5, duration = 500) => {
  const screenHeight = Dimensions.get('window').height;
  const slideAnim = useRef(
    new Animated.Value(screenHeight * initialHeightOffset),
  ).current;

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const slideOut = (callback?: () => void) => {
    Animated.timing(slideAnim, {
      toValue: screenHeight * initialHeightOffset,
      duration,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      if (callback) callback();
    });
  };

  const resetAnimation = () => {
    slideAnim.setValue(screenHeight * initialHeightOffset);
  };

  useEffect(() => {
    slideIn();
  }, []);

  return { slideAnim, slideOut, slideIn, resetAnimation };
};

export default useSlideAnimation;
