import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppContextProvider } from './contexts';
import Root from './root';

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
