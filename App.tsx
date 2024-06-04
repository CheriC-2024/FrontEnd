import React from 'react';
import GlobalStyle from './src/styles/globalStyles';
import AppNavigator from './src/navigations/AppNavigator';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppNavigator />
    </>
  );
};

export default App;
