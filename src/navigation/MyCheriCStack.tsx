import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyChericStackParamList } from './types';
import PrivateArtRegisterStack from './PrivateArtRegisterStack';

const Stack = createStackNavigator<MyChericStackParamList>();

const MyCheriCStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <Stack.Screen
        name='PrivateArtRegister'
        component={PrivateArtRegisterStack}
      />
    </Stack.Navigator>
  );
};

export default MyCheriCStack;
