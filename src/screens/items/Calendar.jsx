import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { Color } from '../../components/styles/GlobalStyles';

const Calendar = () => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();

    // console.log('Ngày và giờ đã chọn:', date);
  };

  return (
    <View style={styles.textFlexBox}>
      <TouchableOpacity onPress={showDatePicker}>
        <Image style={styles.logoEvent} source={require('../../assets/icon--event2.png')} />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {selectedDate && (
        <Text style={styles.dashboard}>
          {`${new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(
            selectedDate,
          )}, ${selectedDate.getDate()}/${
            selectedDate.getMonth() + 1
          }/${selectedDate.getFullYear()}`}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default Calendar;
