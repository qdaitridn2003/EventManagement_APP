import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { Color } from '../../components/styles/GlobalStyles';

const MyCalendar = ({ label, selectedDate, onPress = () => {}, ...props }) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const dateObject = new Date(selectedDate);

  // Lấy ngày, tháng và năm từ đối tượng Date
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();

  // Định dạng lại ngày dưới dạng 'DD-MM-YYYY'
  const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  return (
    <View style={styles.container}>
      <Text style={styles.labelInput}>{label}</Text>
      <View style={styles.textFlexBox}>
        <TouchableOpacity onPress={() => setIsCalendarVisible(!isCalendarVisible)}>
          <Image style={styles.logoEvent} source={require('../../assets/icon--event2.png')} />
        </TouchableOpacity>
        <Text style={styles.dashboard}>{formattedDate}</Text>
      </View>
      {isCalendarVisible && (
        <Calendar
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
          {...props}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  labelInput: {
    marginTop: 16,
    color: '#1C1243',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboard: {
    fontSize: 16,
    lineHeight: 29,
    textAlign: 'left',
    color: Color.colorMidnightblue,
    fontWeight: '700',
  },
  logoEvent: {
    marginLeft: 8,
    height: 24,
    width: 24,
    margin: 7,
  },
});

export default MyCalendar;
