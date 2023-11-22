import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeNavigation from './HomeNavigation';
import { ChangePasswordScreen, LoginScreen, RegisterScreen, ForgotPasswordScreen } from '../screens';
import AddClient from '../screens/clients/AddClient';
import AddEmployee from '../screens/employees/AddEmployee';
import AddEvent from '../screens/events/AddEvent';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }}/>

      <Stack.Screen name="AddEmployee" component={AddEmployee} options={{ headerShown: false }} />
      <Stack.Screen name="AddClient" component={AddClient} options={{ headerShown: false }} />
      <Stack.Screen name="AddEvent" component={AddEvent} options={{ headerShown: false }} />
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
