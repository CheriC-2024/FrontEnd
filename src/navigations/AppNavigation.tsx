import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationBar from '../components/NavigationBar';

import {
  HomeScreen,
  SearchScreen,
  ExhibitScreen,
  CollectingScreen,
  MyCheriCScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

const AppNavigation: React.FC = () => {
  return (
    <Tab.Navigator tabBar={(props) => <NavigationBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Exhibit" component={ExhibitScreen} />
      <Tab.Screen name="Collecting" component={CollectingScreen} />
      <Tab.Screen name="My CheriC" component={MyCheriCScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
