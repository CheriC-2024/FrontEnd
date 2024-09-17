import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ArtCollecting,
  ArtistCollecting,
  ArtistProfile,
  CollectingScreen,
} from 'src/screens/_index';
import { CollectingStackParamList } from './types';

const Stack = createStackNavigator<CollectingStackParamList>();

const CollectingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <Stack.Screen name='ArtCollecting' component={ArtCollecting} />
      <Stack.Screen name='ArtistCollecting' component={ArtistCollecting} />
      <Stack.Screen name='ArtistProfile' component={ArtistProfile} />
    </Stack.Navigator>
  );
};

export default CollectingStack;
