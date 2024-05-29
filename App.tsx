import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigations/AppNavigation';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default App;
