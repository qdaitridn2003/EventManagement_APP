import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import { Color, Padding } from '../../components/styles/GlobalStyles';
import Calendar from '../items/Calendar';

const ToolbarAdd = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.toolbarDetail}>
      <TouchableOpacity onPress={goBack}>
        <Image style={styles.backward} source={require('../../assets/icon--backward3x.png')} />
      </TouchableOpacity>

      <Text style={styles.title}>Tạo hợp đồng</Text>

      <Image style={styles.cancel} source={require('../../assets/icon--right.png')} />
    </View>
  );
};

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
];

const data2 = [
  { label: 'Choice A', value: 'choiceA' },
  { label: 'Choice B', value: 'choiceB' },
];
const data3 = [
  { label: 'Choice C', value: 'choiceC' },
  { label: 'Choice D', value: 'choiceD' },
];

const ContentEvent = () => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [clientValue, setClientValue] = useState(null);
  const [employeeValue, setEmployeeValue] = useState(null);

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  return (
    <View>
      <Text style={styles.labelInput}>Tên hợp đồng</Text>
      <View style={styles.containerTextInput}>
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="Hợp đồng mua bán" />
      </View>

      <Text style={styles.labelInput}>Tên sự kiện</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />

      <Text style={styles.labelInput}>Tên khách hàng</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data2}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        value={clientValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setClientValue(item.value);
          setIsFocus(false);
        }}
      />

      <Text style={styles.labelInput}>Tên nhân viên</Text>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data3}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        value={employeeValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setEmployeeValue(item.value);
          setIsFocus(false);
        }}
      />

      <Text style={styles.labelInput}>Bắt đầu</Text>
      <Calendar />

      <Text style={styles.labelInput}>Kết thúc</Text>
      <Calendar />

      <Text style={styles.labelInput}>Ghi chú</Text>
      <View style={styles.containerTextInput}>
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="" />
      </View>

      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate('ContractsScreen')}
      >
        <Text style={styles.text}>Tạo hợp đồng</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddContracts = () => {
  return (
    <View style={styles.container}>
      <ToolbarAdd />
      <ContentEvent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    width: '100%',
    height: 800,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
  },
  toolbarDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  backward: {
    width: 30,
    height: 30,
  },
  cancel: {
    width: 25,
    height: 25,
    alignItems: 'flex-end',
    alignContent: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: Color.colorText,
  },
  touchable: {
    alignItems: 'center',
  },
  labelInput: {
    marginTop: 16,
    color: '#1C1243',
    fontWeight: 'bold',
    fontSize: 16,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  containerTextInput: {
    marginTop: 6,
    width: '100%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 3,
    overflow: 'hidden',
  },
  iconUsername: {
    width: 20,
    height: 20,
    marginRight: 8,
    marginLeft: 24,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    height: 40,
    marginLeft: 20,
  },

  calendarContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    marginTop: 25,
    height: 48,
    backgroundColor: '#643FDB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: '#FFFFFF',
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
  logoAdd: {
    width: 45,
    height: 45,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AddContracts;
