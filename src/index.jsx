import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Root from './root';
import { AppContextProvider } from './contexts/AppContext';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppContextProvider>
        <Root />
      </AppContextProvider>
    </SafeAreaView>
  );
};

export default App;
