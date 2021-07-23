import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './navigations';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import {ProgressProvider, UserProvider} from './context';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ProgressProvider>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </ProgressProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
