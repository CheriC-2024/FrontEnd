import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PrivateArtRegisterParamList } from './types';
import {
  AddArtwork,
  AddArtworkInfo,
  AddDocs,
  RegisterCompletion,
} from 'src/screens/_index';

const Stack = createStackNavigator<PrivateArtRegisterParamList>();

const MyCheriCStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <Stack.Screen name='AddArtwork' component={AddArtwork} />
      <Stack.Screen name='AddArtworkInfo' component={AddArtworkInfo} />
      <Stack.Screen name='AddDocs' component={AddDocs} />
      <Stack.Screen name='RegisterCompletion' component={RegisterCompletion} />
    </Stack.Navigator>
  );
};

export default MyCheriCStack;
