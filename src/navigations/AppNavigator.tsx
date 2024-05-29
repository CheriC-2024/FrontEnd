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
} from '../screens';
import NavigationBar from '../components/NavigationBar';
import { View } from 'react-native';
import styled from 'styled-components/native';

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

type RootStackParamList = {
  Exhibit: { step: number };
  MainTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
