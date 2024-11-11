import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PrivateArtworkList } from 'src/screens/_index';
import { HomeStackParamList } from './types';

const Stack = createStackNavigator<HomeStackParamList>();

const CollectingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <Stack.Screen name='PrivateArtworkList' component={PrivateArtworkList} />
    </Stack.Navigator>
  );
};

export default CollectingStack;
