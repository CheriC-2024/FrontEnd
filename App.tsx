import React, { useEffect, useState } from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import * as Font from 'expo-font';

const App = () => {
  //폰트 적용
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        Thin: require('./src/assets/fonts/Pretendard/Pretendard-Thin.otf'),
        ExtraLight: require('./src/assets/fonts/Pretendard/Pretendard-ExtraLight.otf'),
        Light: require('./src/assets/fonts/Pretendard/Pretendard-Light.otf'),
        Regular: require('./src/assets/fonts/Pretendard/Pretendard-Regular.otf'),
        Medium: require('./src/assets/fonts/Pretendard/Pretendard-Medium.otf'),
        SemiBold: require('./src/assets/fonts/Pretendard/Pretendard-SemiBold.otf'),
        Bold: require('./src/assets/fonts/Pretendard/Pretendard-Bold.otf'),
        ExtraBold: require('./src/assets/fonts/Pretendard/Pretendard-ExtraBold.otf'),
        Black: require('./src/assets/fonts/Pretendard/Pretendard-Black.otf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  return <AppNavigator />;
};

export default App;
