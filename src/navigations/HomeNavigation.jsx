import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';

import { ProfileScreen, EventScreen, EmployeeScreen, ClientScreen } from '../screens';
import TestScreen from '../screens/TestScreen';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconSource;

          if (route.name === 'Event') {
            iconSource = require('../assets/icon--event.png');
          } else if (route.name === 'Client') {
            iconSource = require('../assets/icon--client.png');
          } else if (route.name === 'Employee') {
            iconSource = require('../assets/icon--employee.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../assets/icon--profile.png');
          }

          return (
            <Image
              style={{ width: 25, height: 25, tintColor: color, marginTop: 10, marginBottom: 5 }}
              source={iconSource}
            />
          );
        },
        tabBarStyle: {
          marginHorizontal: 5,
          height: 55,
          borderRadius: 12,
          paddingHorizontal: 20,
        },
        tabBarActiveTintColor: '#643FDB',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontWeight: 'bold',
          marginBottom: 5,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name="Event" component={EventScreen} options={{ title: 'Sự kiện' }} />
      <Tab.Screen name="Client" component={ClientScreen} options={{ title: 'Khách hàng' }} />
      <Tab.Screen name="Employee" component={EmployeeScreen} options={{ title: 'Nhân viên' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Cá nhân' }} />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
