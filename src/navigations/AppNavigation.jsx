import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthNavigation, BottomNavigation } from './index';
import { AppContext } from '../contexts';
import { accessTokenKey } from '../constant/constant';

const AppNavigation = () => {
  const { isLogin, setIsLogin } = useContext(AppContext);
  // useEffect(() => {
  //   (async () => {
  //     const accessToken = await AsyncStorage.getItem(accessTokenKey);
  //     if (accessToken) {
  //       setIsLogin(true);
  //     }
  //   })();
  // }, []);
  return (
    <NavigationContainer>{isLogin ? <BottomNavigation /> : <AuthNavigation />}</NavigationContainer>
    // <NavigationContainer>{isLogin ? <AuthNavigation /> : <BottomNavigation />}</NavigationContainer>
  );
};

export default AppNavigation;
