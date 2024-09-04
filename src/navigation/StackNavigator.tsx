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
        <Stack.Navigator
          initialRouteName='MainTabs'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='Onboarding' component={OnboardingScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Signup' component={SignupScreen} />
          <Stack.Screen name='MainTabs' component={MainTabs} />
          <Stack.Screen
            name='AIRecommendLoading'
            component={AIRecommendLoading}
            options={({ navigation, route }) => ({
              headerTitle: 'AI 추천',
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    if (route.params?.source === 'ThemeSetting') {
                      navigation.navigate('Exhibit', { step: 2 });
                    } else if (route.params?.source === 'DescriptionSetting') {
                      navigation.navigate('Exhibit', { step: 4 });
                    } else {
                      navigation.goBack();
                    }
                  }}
                >
                  <Icon name='chevron-back' size={24} color='#120000' />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name='AIRecommendTheme'
            component={AIRecommendTheme}
            options={{
              headerTitle: '전시 테마 AI 추천',
              headerLeft: () => null,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name='AIRecommendDescription'
            component={AIRecommendDescription}
            options={{
              headerTitle: '전시 이름 AI 추천',
              headerLeft: () => null,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name='ArtworkList'
            component={ArtworkList}
            options={({ navigation }) => ({
              headerTitle: '전시로 올려질 작품',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name='chevron-back' size={24} color='#000' />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name='ArtworkDetail'
            component={ArtworkDetail}
            options={({ navigation }) => ({
              headerTitle: '작품의 상세 정보',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name='chevron-back' size={24} color='#000' />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </GlobalStateProvider>
    </GestureHandlerRootView>
  );
};

export default StackNavigator;
