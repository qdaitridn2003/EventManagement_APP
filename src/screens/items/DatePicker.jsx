import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Color } from '../../components/styles/GlobalStyles';

const DatePicker = ({ label, selectedDate }) => {
  const [date, setDate] = useState(new Date());
  const [textDate, setTextDate] = useState('01/01/2023');
  const [showDate, setShowDate] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
    const tempDate = new Date(currentDate);
    const fDate =
      tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setTextDate(fDate);
    console.log(fDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.labelInput}>{label}</Text>

      <TouchableOpacity style={styles.textFlexBox} onPress={() => setShowDate(true)}>
        <Image style={styles.logoEvent} source={require('../../assets/icon--event2.png')} />
        <Text style={styles.dashboard}>{textDate}</Text>
      </TouchableOpacity>

      {showDate ? (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode={'date'}
          display="default"
          onChange={onChangeDate}
        />
      ) : null}
    </View>
  );
};

export default DatePicker;

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
    paddingVertical: 10,
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
