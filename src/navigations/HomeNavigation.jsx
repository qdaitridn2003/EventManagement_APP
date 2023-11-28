import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { ProfileScreen, EventScreen, EmployeeScreen, ClientScreen } from '../screens';
import { Color } from '../components/styles/GlobalStyles';
import Icon from '../components/common/Icon';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconSource;

          if (route.name === 'Event') {
            iconSource = require('../assets/icons/Event.png');
          } else if (route.name === 'Client') {
            iconSource = require('../assets/icons/GroupOutline.png');
          } else if (route.name === 'Employee') {
            iconSource = require('../assets/icons/BadgeOutline.png');
          } else if (route.name === 'Profile') {
            iconSource = require('../assets/icons/Manager.png');
          }

          return <Icon source={iconSource} color={color} style={{ marginTop: 8 }} />;
        },
        tabBarStyle: {
          // marginHorizontal: 20,
          // marginVertical: 16,
          height: 64,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          paddingHorizontal: 20,
        },
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.neutral2,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        backgroundColor: 'red',
        borderTopWidth: 0,
      })}>
      <Tab.Screen name="Event" component={EventScreen} options={{ title: 'Sự kiện' }} />
      <Tab.Screen name="Client" component={ClientScreen} options={{ title: 'Khách hàng' }} />
      <Tab.Screen name="Employee" component={EmployeeScreen} options={{ title: 'Nhân viên' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Cá nhân' }} />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
