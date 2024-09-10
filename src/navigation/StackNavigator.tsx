import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './TabNavigator';
import ExhibitScreen from '../screens/ExhibitScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AIRecommendLoading from '../screens/AIRecommendation/AIRecommendLoading';
import AIRecommendTheme from '../screens/AIRecommendation/AIRecommendTheme';
import { ProgressBarProvider } from '../contexts/ProgressBarContext';
import AIRecommendDescription from '../screens/AIRecommendation/AIRecommendDescription';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ArtworkList from '../screens/ExhibitScreens/ArtworkList';
import ArtworkDetail from '../screens/ExhibitScreens/ArtworkDetail';
import { GlobalStateProvider } from '../contexts/GlobalStateContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StackParamList } from './types';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalStateProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Onboarding' component={OnboardingScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
          <Stack.Screen
            name='AIRecommendLoading'
            component={AIRecommendLoading}
          />
          <Stack.Screen
            name='AIRecommendTheme'
            component={AIRecommendTheme}
            options={{
              headerLeft: () => null,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name='AIRecommendDescription'
            component={AIRecommendDescription}
            options={{
              headerLeft: () => null,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen name='ArtworkList' component={ArtworkList} />
          <Stack.Screen name='ArtworkDetail' component={ArtworkDetail} />
        </Stack.Navigator>
      </GlobalStateProvider>
    </GestureHandlerRootView>
  );
};

export default StackNavigator;
