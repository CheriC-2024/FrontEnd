import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './TabNavigator';
import Stack from './StackNavigator';
import { RootStackParamList } from './types';
import CollectingStack from './CollectingStack';

const Nav = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Nav.Navigator
      // initialRouteName='Stack'
      screenOptions={{ headerShown: false }}
    >
      <Nav.Screen name='Tabs' component={Tabs} />
      <Nav.Screen name='Stack' component={Stack} />
      <Nav.Screen name='CollectingStack' component={CollectingStack} />
    </Nav.Navigator>
  );
};
export default RootNavigator;
