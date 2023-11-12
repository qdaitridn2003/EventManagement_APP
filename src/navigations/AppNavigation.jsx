import React, { useContext } from 'react';

import { HomeNavigation, AuthNavigation } from './index';
import { AppContext } from '../contexts/AppContext';

const AppNavigation = () => {
  const { isLogin } = useContext(AppContext);
  return isLogin ? <HomeNavigation /> : <AuthNavigation />;
};

export default AppNavigation;
