import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  ChangePasswordScreen,
  AddClient,
  AddEmployee,
  AddEvent,
  DetailEventScreen,
  DetailProfileScreen,
} from '../screens';

const HomeNaviga = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddEmployee" component={AddEmployee} options={{ headerShown: false }} />
      <Stack.Screen name="AddClient" component={AddClient} options={{ headerShown: false }} />
      <Stack.Screen name="AddEvent" component={AddEvent} options={{ headerShown: false }} />
      <Stack.Screen
        name="DetailProfileScreen"
        component={DetailProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailEventScreen"
        component={DetailEventScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNaviga;
