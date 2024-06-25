import React, { ReactNode } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import ExhibitScreen from '../screens/ExhibitScreen';
import AIRecommendLoading from '../screens/AIRecommendation/AIRecommendLoading';
import AIRecommendTheme from '../screens/AIRecommendation/AIRecommendTheme';
import { ProgressBarProvider } from '../components/ProgressBarContext';
import AIRecommendDescription from '../screens/AIRecommendation/AIRecommendDescription';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ArtworkList from '../screens/Exhibit/ArtworkList';
import ArtworkDetail from '../screens/Exhibit/ArtworkDetail';
import { GlobalStateProvider } from '../contexts/GlobalStateContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export type RootStackParamList = {
  MainTabs: undefined;
  Exhibit: { step: number; selectedThemes?: string[] };
  AIRecommendLoading: { source: string };
  AIRecommendTheme: { source: string };
  AIRecommendDescription: { source: string };
  ThemeSetting: undefined;
  DescriptionSetting: undefined;
  ArtworkList: undefined;
  ArtworkDetail: {
    isCollectorOnly: boolean;
    imageUrl: any;
    title: ReactNode;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalStateProvider>
        <ProgressBarProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="MainTabs"
              screenOptions={{
                headerTitleStyle: {
                  fontFamily: 'Bold', // 원하는 폰트 패밀리로 변경
                  fontSize: 16, // 원하는 폰트 크기로 변경
                  color: '#120000', // 원하는 폰트 색상으로 변경
                },
              }}
            >
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
                options={({ navigation, route }) => ({
                  headerTitle: 'AI 추천',
                  headerLeft: () => (
                    <TouchableOpacity
                      onPress={() => {
                        if (route.params?.source === 'ThemeSetting') {
                          navigation.navigate('Exhibit', { step: 2 });
                        } else if (
                          route.params?.source === 'DescriptionSetting'
                        ) {
                          navigation.navigate('Exhibit', { step: 4 });
                        } else {
                          navigation.goBack();
                        }
                      }}
                    >
                      <Icon name="chevron-back" size={24} color="#120000" />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen
                name="AIRecommendTheme"
                component={AIRecommendTheme}
                options={{
                  headerTitle: '전시 테마 AI 추천',
                  headerLeft: () => null,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="AIRecommendDescription"
                component={AIRecommendDescription}
                options={{
                  headerTitle: '전시 이름 AI 추천',
                  headerLeft: () => null,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="ArtworkList"
                component={ArtworkList}
                options={({ navigation }) => ({
                  headerTitle: '전시로 올려질 작품',
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Icon name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen
                name="ArtworkDetail"
                component={ArtworkDetail}
                options={({ navigation }) => ({
                  headerTitle: '작품의 상세 정보',
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Icon name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                  ),
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ProgressBarProvider>
      </GlobalStateProvider>
    </GestureHandlerRootView>
  );
};

export default AppNavigator;
