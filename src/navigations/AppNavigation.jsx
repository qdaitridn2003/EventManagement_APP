import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import 'react-native-gesture-handler';

import { HomeNavigation, AuthNavigation } from './index';
import { AppContext } from '../contexts';
import NotificationScreen from '../screens/NotificationScreen';

const AppNavigation = () => {
  const { isLogin } = useContext(AppContext);
  return (
    <NavigationContainer>
      {isLogin ? <HomeNavigation /> : <NotificationScreen />}
    </NavigationContainer>
  );
};

export default AppNavigation;
