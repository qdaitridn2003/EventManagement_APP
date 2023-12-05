import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import 'react-native-gesture-handler';

import { HomeNavigation, AuthNavigation, BottomNavigation } from './index';
import { AppContext } from '../contexts';

const AppNavigation = () => {
  const { isLogin } = useContext(AppContext);
  return (
    <NavigationContainer>{isLogin ? <BottomNavigation /> : <AuthNavigation />}</NavigationContainer>
  );
};

export default AppNavigation;
