import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  SearchScreen,
  ExhibitScreen,
  CollectingScreen,
  MyCheriCScreen,
} from '../screens';
import NavigationBar from '../components/NavigationBar'; // NavigationBar 컴포넌트 참조

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <NavigationBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          display: ['AIRecommendLoading', 'AIRecommend'].includes(route.name)
            ? 'none'
            : 'flex',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'CheriC' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'CheriC' }}
      />
      <Tab.Screen
        name="Exhibit"
        component={ExhibitScreen}
        options={{ title: ' ' }}
      />
      <Tab.Screen
        name="Collecting"
        component={CollectingScreen}
        options={{ title: 'CheriC' }}
      />
      <Tab.Screen
        name="My CheriC"
        component={MyCheriCScreen}
        options={{ title: 'CheriC' }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
