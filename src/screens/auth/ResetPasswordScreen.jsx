import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { Color, FontSize, Padding } from '../../../src/components/styles/GlobalStyles';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import { emailRegisterKey } from '../../constant/constant';
import { axiosPost, axiosPut } from '../../configs/axiosInstance';
import CustomPassInput from '../../components/common/CustomPassInput';

const ResetPasswordScreen = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useState({});
  console.log(inputs);
  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleResetPassword = async () => {
    const email = await AsyncStorage.getItem(emailRegisterKey);
    const response = await axiosPut('/auth/reset-password', {
      username: email,
      password: inputs.newPassword,
      confirmPassword: inputs.confirmNewPassword,
    });
    if (!inputs.newPassword) {
      handleErrors('Vui lòng nhập mật khẩu mới', 'newPassword');
    } else if (!inputs.newPassword.length > 6) {
      handleErrors('Mật khẩu phải có ít nhất 6 ký tự', 'newPassword');
    }
    if (!inputs.confirmNewPassword) {
      handleErrors('Vui lòng xác nhận mật khẩu mới', 'confirmNewPassword');
    } else if (!inputs.newPassword === inputs.confirmNewPassword) {
      handleErrors('Xác nhận mật khẩu không khớp với mật khẩu mới', 'confirmNewPassword');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.title, styles.titleSpaceBlock]}>
        <Text style={styles.ngNhp}>Lấy lại mật khẩu</Text>
      </View>

      <CustomPassInput
        label="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới"
        onChangeText={(text) => handleOnChange(text, 'newPassword')}
        error={errors.newPassword}
        onFocus={() => handleErrors(null, 'newPassword')}
      />
      <CustomPassInput
        label="Xác nhận Mật khẩu mới"
        placeholder="Nhập lại mật khẩu mới"
        onChangeText={(text) => handleOnChange(text, 'confirmNewPassword')}
        error={errors.confirmNewPassword}
        onFocus={() => handleErrors(null, 'confirmNewPassword')}
      />
      <CustomButton title="Lưu" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: '100%',
    height: 812,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
  },
  title: {
    padding: 10,
    margin: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'stretch',
  },
  ngNhp: {
    fontSize: FontSize.title24Bold_size,
    lineHeight: 29,
    textAlign: 'center',
    color: Color.colorMidnightblue,
    fontWeight: '700',
    flex: 1,
  },
});
