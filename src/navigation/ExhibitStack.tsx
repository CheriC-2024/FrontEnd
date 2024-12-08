import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CollectionSelect,
  ArtworkSelect,
  ThemeSetting,
  ArtworkInfoSetting,
  DescriptionSetting,
  CoverSetting,
  FinishSetting,
  ExhibitCompletion,
} from 'src/screens/ExhibitScreens/_index';
import { ExhibitStackParamList } from './types';

const Stack = createStackNavigator<ExhibitStackParamList>();

const ExhibitStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <Stack.Screen name='CollectionSelect' component={CollectionSelect} />
      <Stack.Screen name='ArtworkSelect' component={ArtworkSelect} />
      <Stack.Screen name='ThemeSetting' component={ThemeSetting} />
      <Stack.Screen name='ArtworkInfoSetting' component={ArtworkInfoSetting} />
      <Stack.Screen name='DescriptionSetting' component={DescriptionSetting} />
      <Stack.Screen name='CoverSetting' component={CoverSetting} />
      <Stack.Screen name='FinishSetting' component={FinishSetting} />
      <Stack.Screen name='ExhibitCompletion' component={ExhibitCompletion} />
    </Stack.Navigator>
  );
};

export default ExhibitStack;
