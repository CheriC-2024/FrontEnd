import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ArtistRegisterParamList } from './types';
import {
  AddDocs,
  AddInfo,
  AddResume,
  Completion,
} from 'src/screens/MyChericScreens/ArtistRegister/_index';

const Stack = createStackNavigator<ArtistRegisterParamList>();

const ArtistRegisterStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <Stack.Screen name='AddInfo' component={AddInfo} />
      <Stack.Screen name='AddResume' component={AddResume} />
      <Stack.Screen name='AddDocs' component={AddDocs} />
      <Stack.Screen name='Completion' component={Completion} />
    </Stack.Navigator>
  );
};

export default ArtistRegisterStack;
