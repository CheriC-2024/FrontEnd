import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  OnboardingScreen,
  LoginScreen,
  SignupScreen,
  AIRecommendLoading,
  AIRecommendTheme,
  AIRecommendDescription,
  ArtworkDetail,
  ArtworkList,
} from '../screens/_index';
import { StackParamList } from './types';

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName='Onboarding'
        screenOptions={{ headerShown: false }}
      >
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
        <Stack.Screen name='ArtworkDetail' component={ArtworkDetail} />
        <Stack.Screen name='ArtworkList' component={ArtworkList} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

export default StackNavigator;
