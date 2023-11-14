import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Provider as RNPaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Root from './root';
import { AppContextProvider } from './contexts/AppContext';

const App = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <RNPaperProvider>
        <AppContextProvider>
          <Root />
        </AppContextProvider>
      </RNPaperProvider>
    </SafeAreaView>
  );
};

export default App;
