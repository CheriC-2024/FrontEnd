import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ArtCollecting,
  ArtistCollecting,
  ArtistProfile,
  ArtworkInfo,
  CollectingScreen,
  CreateCollection,
  RequestArtwork,
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
      <Stack.Screen name='ArtworkInfo' component={ArtworkInfo} />
      <Stack.Screen name='CreateCollection' component={CreateCollection} />
      <Stack.Screen name='RequestArtwork' component={RequestArtwork} />
    </Stack.Navigator>
  );
};

export default CollectingStack;
