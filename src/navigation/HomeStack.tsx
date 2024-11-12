import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CollectorProfile,
  ExhibitList,
  PrivateArtworkInfo,
  PrivateArtworkList,
} from 'src/screens/_index';
import { HomeStackParamList } from './types';

const Stack = createStackNavigator<HomeStackParamList>();

const CollectingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <Stack.Screen name='CollectorProfile' component={CollectorProfile} />
      <Stack.Screen name='ExhibitList' component={ExhibitList} />
      <Stack.Screen name='PrivateArtworkList' component={PrivateArtworkList} />
      <Stack.Screen name='PrivateArtworkInfo' component={PrivateArtworkInfo} />
    </Stack.Navigator>
  );
};

export default CollectingStack;
