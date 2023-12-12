import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import IconButton from '../common/IconButton';
import { Color } from '../styles/GlobalStyles';

const CustomAppbar = ({ onPress, style }) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [currentDay, setCurrentDay] = useState(getCurrentDay());

  useEffect(() => {
    // Update the current time every minute
    const timeIntervalId = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    // Update the current date every day
    const dateIntervalId = setInterval(
      () => {
        setCurrentDate(getCurrentDate());
        setCurrentDay(getCurrentDay());
      },
      24 * 60 * 60 * 1000,
    );

    // Clear the intervals when the component is unmounted
    return () => {
      clearInterval(timeIntervalId);
      clearInterval(dateIntervalId);
    };
  }, []);

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // 24-hour format
    // const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    // 12-hour format
    const formattedHours = hours % 12 || 12;
    const amPm = hours >= 12 ? 'PM' : 'AM';

    const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;

    return formattedTime;
  }

  function getCurrentDate() {
    const now = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

    // Format the date as "dd/mm/yyyy"
    const formattedDate = now.toLocaleDateString('en-GB', options);

    return formattedDate;
  }

  function getCurrentDay() {
    const now = new Date();
    const options = { weekday: 'long' };

    // Get the day name in Vietnamese
    const dayName = now.toLocaleDateString('vi-VN', options);

    return dayName;
  }

  return (
    <Appbar.Header style={[styles.appBar, style]}>
      <View style={styles.mainContainer}>
        <Avatar.Image size={48} source={{ uri: 'https://picsum.photos/200' }} />
        <View style={styles.textContainer}>
          <Text style={styles.textTime}>{currentTime}</Text>
          <Text style={styles.textDay}>{currentDay}</Text>
        </View>
        <IconButton iconSource={require('../../assets/icons/Plus.png')} onPress={onPress} />
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    backgroundColor: Color.neutral4,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textTime: {
    marginBottom: 2,
    fontSize: 16,
    color: Color.neutral2,
  },
  textDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.neutral1,
  },
});

export default CustomAppbar;
