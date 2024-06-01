import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import ExhibitScreen from '../screens/Exhibit/ExhibitScreen';
import AIRecommendLoading from '../screens/AIRecommendation/AIRecommendLoading';
import AIRecommend from '../screens/AIRecommendation/AIRecommend';
import { ProgressBarProvider } from '../components/ProgressBarContext';
import { ThemeProvider } from '../contexts/ThemeContext';

type RootStackParamList = {
  MainTabs: undefined;
  Exhibit: { step: number; selectedThemes?: string[] };
  AIRecommendLoading: undefined;
  AIRecommend: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <ProgressBarProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainTabs">
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Exhibit"
              component={ExhibitScreen}
              options={{ headerTitle: '' }}
            />
            <Stack.Screen
              name="AIRecommendLoading"
              component={AIRecommendLoading}
              options={{ headerTitle: 'AI 테마 추천' }}
            />
            <Stack.Screen
              name="AIRecommend"
              component={AIRecommend}
              options={{ headerTitle: 'AI 테마 선택' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </ProgressBarProvider>
  );
};

export default AppNavigator;
