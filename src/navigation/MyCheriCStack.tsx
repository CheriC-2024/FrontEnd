import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyChericStackParamList } from './types';
import PrivateArtRegisterStack from './PrivateArtRegisterStack';
import ArtistRegisterStack from './ArtistRegisterStack';

const Stack = createStackNavigator<MyChericStackParamList>();

const MyCheriCStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='PrivateArtRegister'
        component={PrivateArtRegisterStack}
      />
      <Stack.Screen name='ArtistRegister' component={ArtistRegisterStack} />
    </Stack.Navigator>
  );
};

export default MyCheriCStack;
