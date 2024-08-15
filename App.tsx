import React, { useEffect, useState } from 'react';
import AppNavigator from './src/navigations/AppNavigator';
import * as Font from 'expo-font';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from 'styled-components/native';
import { theme } from 'src/styles/theme';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          PretendardRegular: require('./src/assets/fonts/Pretendard/Pretendard-Regular.otf'),
          PretendardBold: require('./src/assets/fonts/Pretendard/Pretendard-Bold.otf'),
          BlackHanSans: require('./src/assets/fonts/BlackHanSans-Regular.ttf'),
          Mapo: require('./src/assets/fonts/MapoDacapo.ttf'),
          //SnowFrost: require('./src/assets/fonts/SnowFrost.ttf'),
          SanTokki: require('./src/assets/fonts/SanTokki.ttf'),
          Lotteria: require('./src/assets/fonts/Lotteria.otf'),
          //Ryu: require('./src/assets/fonts/OnGeurLip-Ryu.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        // Optionally, you can set a state to indicate the error and show an error message to the user
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E52C32" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppNavigator />
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
