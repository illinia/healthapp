import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import Navigation from './navigations';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
