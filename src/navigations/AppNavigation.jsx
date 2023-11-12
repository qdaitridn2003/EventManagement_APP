import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';

import { HomeNavigation, AuthNavigation } from './index';
import { AppContext } from '../contexts/AppContext';

const AppNavigation = () => {
  const { isLogin } = useContext(AppContext);
  return (
    <NavigationContainer>{isLogin ? <HomeNavigation /> : <AuthNavigation />}</NavigationContainer>
  );
};

export default AppNavigation;
