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
import { TouchableOpacity, Text, View } from 'react-native';
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
          options={({ navigation, route }) => {
            const step = route.params?.step ?? 0;

            const goToNext = () => {
              if (step < 6) {
                navigation.setParams({ step: step + 1 });
              } else {
                navigation.navigate('MainTabs');
              }
            };

            const goToPrev = () => {
              if (step > 0) {
                navigation.setParams({ step: step - 1 });
              } else {
                navigation.goBack();
              }
            };

            return {
              headerTitle: '',
              headerLeft: () => (
                <TouchableOpacity onPress={goToPrev}>
                  <Text style={{ marginLeft: 16, color: '#007AFF' }}>이전</Text>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={goToNext}>
                  <Text style={{ marginRight: 16, color: '#007AFF' }}>
                    다음
                  </Text>
                </TouchableOpacity>
              ),
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
