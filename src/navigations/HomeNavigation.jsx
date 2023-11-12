import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';

import { ProfileScreen, EventScreen, EmployeeScreen, CustomerScreen } from '../screens';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'Event') {
            return (
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../assets/icons8-event-48.png')}
              />
            );
          } else if (route.name === 'Customer') {
            return (
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../assets/icons8-customer-50.png')}
              />
            );
          } else if (route.name === 'Employee') {
            return (
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../assets/icons8-employee-50.png')}
              />
            );
          } else if (route.name === 'Profile') {
            return (
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../assets/icons8-profile-50.png')}
              />
            );
          }
        },
        tabBarActiveTintColor: '#643FDB',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Event" component={EventScreen} options={{ title: 'Sự kiện' }} />
      <Tab.Screen name="Customer" component={CustomerScreen} options={{ title: 'Khách hàng' }} />
      <Tab.Screen name="Employee" component={EmployeeScreen} options={{ title: 'Nhân viên' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Cá nhân' }} />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
