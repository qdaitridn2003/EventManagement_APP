import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Image, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { Color } from '../../components/styles/GlobalStyles';

const DateRangePicker = () => {
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleStartDateConfirm = (date) => {
    setStartDate(date);
    hideStartDatePicker();
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(date);
    hideEndDatePicker();
  };

  const generateDateArray = () => {
    // Generate array of dates between startDate and endDate
    const dates = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setSelectedDates(dates);

    // console.log('Selected Dates:', dates);
  };

  return (
    <View>
      <View style={styles.textFlexBox}>
        <TouchableOpacity onPress={showStartDatePicker}>
          <Image style={styles.logoEvent} source={require('../../assets/icon--event2.png')} />
        </TouchableOpacity>
        {startDate && <Text> {startDate.toLocaleDateString('en-GB')}</Text>}

        <Text> ---</Text>
        <TouchableOpacity onPress={showEndDatePicker}>
          <Image style={styles.logoEvent} source={require('../../assets/icon--event2.png')} />
        </TouchableOpacity>
        {endDate && <Text> {endDate.toLocaleDateString('en-GB')}</Text>}
      </View>

      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleEndDateConfirm}
        onCancel={hideEndDatePicker}
      />

      <Button title="Generate Date Array" onPress={generateDateArray} />
    </View>
  );
};

const styles = StyleSheet.create({
  textFlexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default DateRangePicker;
