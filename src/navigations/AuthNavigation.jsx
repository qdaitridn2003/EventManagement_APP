import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeNavigation from './HomeNavigation';
import { ChangePasswordScreen, LoginScreen, RegisterScreen } from '../screens';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
