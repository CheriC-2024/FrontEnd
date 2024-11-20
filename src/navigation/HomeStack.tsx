import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CollectorProfile,
  ExhibitComments,
  ExhibitCommentsDetail,
  ExhibitCommentsWrite,
  ExhibitEntrance,
  ExhibitIntro,
  ExhibitList,
  ExhibitLoading,
  ExhibitViewing,
  ExhibitViewingDetail,
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
      <Stack.Screen name='ExhibitComments' component={ExhibitComments} />
      <Stack.Screen
        name='ExhibitCommentsDetail'
        component={ExhibitCommentsDetail}
      />
      <Stack.Screen
        name='ExhibitCommentsWrite'
        component={ExhibitCommentsWrite}
      />
      <Stack.Screen name='ExhibitEntrance' component={ExhibitEntrance} />
      <Stack.Screen name='ExhibitIntro' component={ExhibitIntro} />
      <Stack.Screen name='ExhibitList' component={ExhibitList} />
      <Stack.Screen name='ExhibitLoading' component={ExhibitLoading} />
      <Stack.Screen name='ExhibitViewing' component={ExhibitViewing} />
      <Stack.Screen
        name='ExhibitViewingDetail'
        component={ExhibitViewingDetail}
      />
      <Stack.Screen name='PrivateArtworkList' component={PrivateArtworkList} />
      <Stack.Screen name='PrivateArtworkInfo' component={PrivateArtworkInfo} />
    </Stack.Navigator>
  );
};

export default CollectingStack;
