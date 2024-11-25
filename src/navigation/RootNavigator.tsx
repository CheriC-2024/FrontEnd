import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './TabNavigator';
import Stack from './StackNavigator';
import { RootStackParamList } from './types';
import CollectingStack from './CollectingStack';
import ExhibitStack from './ExhibitStack';
import HomeStack from './HomeStack';
import MyCheriCStack from './MyCheriCStack';

const Nav = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <Nav.Navigator
      initialRouteName='Stack'
      screenOptions={{ headerShown: false }}
    >
      <Nav.Screen name='Tabs' component={Tabs} />
      <Nav.Screen name='Stack' component={Stack} />
      <Nav.Screen name='CollectingStack' component={CollectingStack} />
      <Nav.Screen name='Exhibit' component={ExhibitStack} />
      <Nav.Screen name='HomeStack' component={HomeStack} />
      <Nav.Screen name='MyChericStack' component={MyCheriCStack} />
    </Nav.Navigator>
  );
};
export default RootNavigator;
