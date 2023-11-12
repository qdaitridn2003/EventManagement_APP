import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeNavigation from './HomeNavigation';
import { LoginScreen } from '../screens';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
