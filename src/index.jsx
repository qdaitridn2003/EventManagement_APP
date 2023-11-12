import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as RNPaperProvider } from 'react-native-paper';

import Root from './Root';
import { AppContextProvider } from './contexts/AppContext';

const App = () => {
  return (
    <RNPaperProvider>
      <AppContextProvider>
        <Root />
      </AppContextProvider>
    </RNPaperProvider>
  );
};

export default App;
