import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Keyboard,
} from 'react-native';

import { Color, FontSize, Padding } from '../../components/styles/GlobalStyles';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import CustomPassInput from '../../components/common/CustomPassInput';
import { getAccessToken } from '../../configs/utils/getAccessToken';
import { axiosAuthPut, axiosPut } from '../../configs/axiosInstance';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleSavePassword = async () => {
    Keyboard.dismiss();
    const accessToken = await getAccessToken();
    const respone = await axiosPut(
      '/auth/change-password',
      {
        oldPassword: inputs.oldPassword,
        newPassword: inputs.newPassword,
        confirmPassword: inputs.confirmNewPassword,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    console.log(respone);
    if (!inputs.oldPassword) {
      handleErrors('Vui lòng nhập mật khẩu hiện tại', 'oldPassword');
    } else if (inputs.oldPassword.length < 6) {
      handleErrors('Mật khẩu ít nhất phải có 6 ký tự', 'oldPassword');
    } else if (respone.message === 'Old password is not correct') {
      handleErrors('Mật khẩu hiện tại không chính xác', 'oldPassword');
    }

    if (!inputs.newPassword) {
      handleErrors('Vui lòng nhập mật khẩu mới', 'newPassword');
    } else if (inputs.newPassword.length < 6) {
      handleErrors('Mật khẩu mới ít nhất phải có 6 ký tự', 'newPassword');
    } else if (inputs.newPassword === inputs.oldPassword) {
      handleErrors('Mật khẩu mới phải khác mật khẩu hiện tại', 'newPassword');
    }

    if (!inputs.confirmNewPassword) {
      handleErrors('Vui lòng xác nhận mật khẩu mới', 'confirmNewPassword');
    } else if (inputs.confirmNewPassword.length < 6) {
      handleErrors('Mật khẩu mới ít nhất phải có 6 ký tự', 'confirmNewPassword');
    } else if (inputs.confirmNewPassword !== inputs.newPassword) {
      handleErrors('Xác nhận mật khẩu phải khớp với mật khẩu hiện tại', 'confirmNewPassword');
    }

    if (!respone.message) {
      ToastAndroid.show('Lưu thành công', ToastAndroid.SHORT);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={styles.iconBackward} source={require('../../assets/icon--backward3x.png')} />
      </TouchableOpacity>
      <View style={styles.containerImage}>
        <Image style={styles.image} source={require('../../assets/icons/Frame.png')} />
      </View>
      <View style={[styles.title, styles.titleSpaceBlock]}>
        <Text style={styles.ngNhp}>Đổi mật khẩu</Text>
      </View>

      <CustomPassInput
        onChangeText={(text) => handleOnChange(text, 'oldPassword')}
        label="Mật khẩu hiện tại"
        placeholder="Nhập mật khẩu hiện tại"
        onFocus={() => handleErrors(null, 'oldPassword')}
        error={errors.oldPassword}
      />
      <CustomPassInput
        onChangeText={(text) => handleOnChange(text, 'newPassword')}
        label="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới"
        onFocus={() => handleErrors(null, 'newPassword')}
        error={errors.newPassword}
      />
      <CustomPassInput
        onChangeText={(text) => handleOnChange(text, 'confirmNewPassword')}
        label="Xác nhận mật khẩu mới"
        placeholder="Xác nhận mật khẩu mới"
        onFocus={() => handleErrors(null, 'confirmNewPassword')}
        error={errors.confirmNewPassword}
      />

      <View style={styles.button}>
        <CustomButton title="Lưu thay đổi" onPress={handleSavePassword} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    width: '100%',
    height: 812,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
  },

  iconBackward: {
    width: 40,
    height: 40,
    padding: 10,
  },
  iconContainer: {
    padding: 8,
  },
  dividerLayout: {
    height: 2,
    backgroundColor: Color.colorWhitesmoke,
    flex: 1,
  },
  ngKTypo: {
    textAlign: 'left',
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
  },
  ngNhp: {
    fontSize: FontSize.title24Bold_size,
    lineHeight: 29,
    textAlign: 'center',
    color: Color.colorMidnightblue,
    fontWeight: '700',
    flex: 1,
  },
  title: {
    padding: 10,
    margin: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgotPassword: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    marginTop: 16,
    color: Color.colorMidnightblue,
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    marginTop: 20,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  hoc: {
    marginLeft: 8,
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    color: Color.neutral2,
    textAlign: 'center',
  },
  dividerItem: {
    marginLeft: 8,
  },
  containerImage: {
    alignItems: 'center',
  },
  image: {
    width: 125,
    height: 140,
  },
});

export default ChangePasswordScreen;
