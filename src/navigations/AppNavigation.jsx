import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import HomeNavigation from './HomeNavigation';
import AuthNavigation from './AuthNavigation';

const AppNavigation = () => {
  const { isLogin } = useContext(AppContext);
  return isLogin ? <HomeNavigation /> : <AuthNavigation />;
};

export default AppNavigation;
