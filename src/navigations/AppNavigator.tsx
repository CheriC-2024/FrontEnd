import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  SearchScreen,
  CollectingScreen,
  MyCheriCScreen,
  ExhibitScreen,
  ThemeSetting,
} from '../screens';
import AIRecommendLoading from '../screens/AIRecommendation/AIRecommendLoading';
import AIRecommend from '../screens/AIRecommendation/AIRecommend';
import NavigationBar from '../components/NavigationBar';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { ProgressBarProvider } from '../components/ProgressBarContext';

type RootStackParamList = {
  MainTabs: undefined;
  Exhibit: { step: number };
  AIRecommendLoading: undefined;
  AIRecommend: undefined;
  ThemeSetting: { selectedThemes: string[] };
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const Container = styled.View`
  flex: 1;
`;

const EmptyScreen = () => {
  return <View />;
};

const commonScreenOptions = {
  title: 'CheriC',
};

const MainTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <NavigationBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={commonScreenOptions}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={commonScreenOptions}
      />
      <Tab.Screen
        name=" "
        component={EmptyScreen}
        options={{ tabBarButton: () => null }}
      />
      <Tab.Screen
        name="Collecting"
        component={CollectingScreen}
        options={commonScreenOptions}
      />
      <Tab.Screen
        name="My CheriC"
        component={MyCheriCScreen}
        options={commonScreenOptions}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <ProgressBarProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Exhibit"
            component={ExhibitScreen}
            initialParams={{ step: 0 }} // 초기값 설정
            options={{
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="AIRecommendLoading"
            component={AIRecommendLoading}
            options={({ navigation }) => ({
              // headerLeft: () => (
              //   <TouchableOpacity onPress={() => navigation.goBack()}>
              //     <Text style={{ marginLeft: 16, color: '#007AFF' }}>이전</Text>
              //   </TouchableOpacity>
              // ),
              headerTitle: '', // 중앙 타이틀을 제거용
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 16,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}
                  >
                    전시 테마 AI추천
                  </Text>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="AIRecommend"
            component={AIRecommend}
            options={({ navigation }) => ({
              headerTitle: '', // 중앙 타이틀을 제거용
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 16,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}
                  >
                    완료
                  </Text>
                </View>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ProgressBarProvider>
  );
};

type CustomHeaderProps = {
  title: string;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 16px;
  height: 56px;
  background-color: #fff;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

export default AppNavigator;
