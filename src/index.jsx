import React from 'react';
import { Provider as RNPaperProvider } from 'react-native-paper';
import Root from './Root';
import { AppContextProvider } from './contexts/AppContext';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <RNPaperProvider>
        <AppContextProvider>
          <Root />
        </AppContextProvider>
      </RNPaperProvider>
    </NavigationContainer>
  );
};

export default App;
