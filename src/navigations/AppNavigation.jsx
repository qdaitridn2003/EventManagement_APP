import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import 'react-native-gesture-handler';

import { AuthNavigation, BottomNavigation } from './index';
import { AppContext } from '../contexts';

const AppNavigation = () => {
  const { isLogin } = useContext(AppContext);
  return (
    // <NavigationContainer>{isLogin ? <BottomNavigation /> : <AuthNavigation />}</NavigationContainer>
    <NavigationContainer>{isLogin ? <AuthNavigation /> : <BottomNavigation />}</NavigationContainer>
  );
};

export default AppNavigation;
