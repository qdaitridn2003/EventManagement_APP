import React, { useContext } from 'react';

import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import { AppContext } from '../contexts/AppContext';

const AppNavigation = () => {
  const { isLogin } = useContext(AppContext);
  return isLogin ? <HomeNavigation /> : <AuthNavigation />;
};

export default AppNavigation;
