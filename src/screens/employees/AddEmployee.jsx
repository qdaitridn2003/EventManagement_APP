import { View, Image, StyleSheet, TouchableOpacity, Alert, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RadioButton } from 'react-native-paper';

import { Color, Padding } from '../../components/styles/GlobalStyles';
import MyCalendar from '../items/MyCalendar';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import { axiosPost } from '../../configs/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authIdKey, emailRegisterKey } from '../../constant/constant';

const AddEmployee = () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    fullName: '',
    dateOfBirth: new Date(),
    gender: 'male',
    phone: '',
    address: '',
  });
  console.log(inputs);

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const handleImageClick = () => {
    Alert.alert('Image Clicked!');
  };

  const handleAddEmployee = async () => {
    const auth_id = await AsyncStorage.getItem(authIdKey);
    const emailRegister = await AsyncStorage.getItem(emailRegisterKey);

    if (!inputs.fullName) {
      handleErrors('Vui lòng nhập Họ và tên', 'fullName');
    }
    if (!inputs.phone) {
      handleErrors('Vui lòng nhập Số điện thoại', 'phone');
    } else if (inputs.phone.length < 10 || inputs.phone.length > 11) {
      handleErrors('Số điện thoại không hợp lệ', 'phone');
    } else {
      const respone = await axiosPost('/employee/register-employee-profile', {
        authId: auth_id,
        email: emailRegister,
        gender: inputs.gender,
        fullName: inputs.fullName,
        dateOfBirth: inputs.dateOfBirth,
        phoneNumber: inputs.phone,
      });
      console.log(respone);
      navigation.navigate('Login');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.title}>Tạo nhân viên</Text>
        <TouchableOpacity onPress={handleImageClick} style={styles.touchable}>
          <Image
            style={styles.avatar}
            resizeMode="cover"
            source={require('../../assets/avatar-28x283x.png')}
          />
        </TouchableOpacity>

        <CustomInput
          placeholder="Nhập họ và tên"
          label="Họ và tên"
          onChangeText={(text) => handleOnChange(text, 'fullName')}
          error={errors.fullName}
          onFocus={() => handleErrors(null, 'fullName')}
        />

        <MyCalendar
          label="Ngày sinh"
          selectedDate={inputs.dateOfBirth}
          onDayPress={(day) => handleOnChange(day.dateString, 'dateOfBirth')}
        />

        <Text style={styles.label}>Giới tính</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 14 }}>
            <Text style={styles.textRadioButton}>Nam</Text>
            <RadioButton
              value="Nam"
              status={inputs.gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => handleOnChange('male', 'gender')}
            />
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 20 }}>
            <Text style={styles.textRadioButton}>Nữ</Text>
            <RadioButton
              value="Nữ"
              status={inputs.gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => handleOnChange('female', 'gender')}
            />
          </View>
        </View>

        <CustomInput
          placeholder="Nhập số điện thoại của bạn"
          label="Số điện thoại"
          onChangeText={(text) => handleOnChange(text, 'phone')}
          error={errors.phone}
          onFocus={() => handleErrors(null, 'phone')}
        />

        <CustomInput
          placeholder="Nhập Địa chỉ"
          label="Địa chỉ"
          onChangeText={(text) => handleOnChange(text, 'address')}
          error={errors.address}
        />

        <CustomButton title="Tạo nhân viên" onPress={handleAddEmployee} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    width: '100%',
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
  },

  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#643FDB',
    backgroundColor: '#FFFFFF',
    paddingTop: 15,

    paddingBottom: 15,
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
  dropDown: {
    marginEnd: 10,
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
  label: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textRadioButton: {
    fontWeight: '500',
    fontSize: 16,
    marginTop: 7,
  },
});

export default AddEmployee;
