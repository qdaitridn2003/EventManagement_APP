import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard } from 'react-native';

import CustomIndicator from '../../components/common/CustomIndicator';
import CustomInput from '../../components/common/CustomInput';
import CustomPassInput from '../../components/common/CustomPassInput';
import { Color, FontSize, Padding } from '../../components/styles/GlobalStyles';
import { axiosPost } from '../../configs/axiosInstance';
import { accessTokenKey } from '../../constant/constant';
import { AppContext } from '../../contexts/AppContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setIsLogin } = useContext(AppContext);
  const [isModalIndicatorVisible, setIsModalIndicatorVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const hanldeLogin = async () => {
    Keyboard.dismiss();
    const response = await axiosPost('/auth/sign-in', {
      username: inputs.email,
      password: inputs.password,
    });

    if (!inputs.email) {
      handleErrors('Vui lòng nhập email', 'email');
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleErrors('Vui lòng nhập email đúng định dạng', 'email');
    } else if (response.message === 'Account is not exist') {
      handleErrors('Vui lòng nhập đúng email đã đăng ký', 'email');
    }

    if (!inputs.password) {
      handleErrors('Vui lòng nhập mật khẩu', 'password');
    } else if (response.message === 'Password is not correct') {
      handleErrors('Sai mật khẩu', 'password');
    }
    if (response.accessToken) {
      setIsModalIndicatorVisible(true);
      await AsyncStorage.setItem(accessTokenKey, response.accessToken);
      setIsLogin(true);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.ngNhp}>Đăng Nhập</Text>
      </View>
      <CustomInput
        label="Email"
        keyboardType="email-address"
        placeholder="Email"
        text="admins@gmail.com"
        iconName="email-outline"
        onChangeText={(text) => handleOnChange(text, 'email')}
        error={errors.email}
        onFocus={() => handleErrors(null, 'email')}
      />

      <CustomPassInput
        label="Mật khẩu"
        placeholder="Mật khẩu"
        text="admin@123"
        iconName="lock-outline"
        onChangeText={(text) => handleOnChange(text, 'password')}
        error={errors.password}
        onFocus={() => handleErrors(null, 'password')}
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={hanldeLogin}>
        <Text style={styles.text}>Đăng nhập</Text>
      </TouchableOpacity>

      <View style={[styles.divider, styles.titleSpaceBlock]}>
        <View style={styles.dividerLayout} />
        <Text style={[styles.hoc, styles.hocClr]}>Hoặc</Text>
        <View style={[styles.dividerItem, styles.dividerLayout]} />
      </View>

      <TouchableOpacity>
        <View style={styles.containerGoogle}>
          <Image
            style={styles.iconGoogle}
            contentFit="cover"
            source={require('../../assets/icon--google3x.png')}
          />

          <Text>Đăng nhập bằng Google</Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.spacer, styles.titleSpaceBlock]} />
      <View style={[styles.footer, styles.titleSpaceBlock]}>
        <Text style={[styles.chaCTi, styles.ngKTypo]}>Đã có tài khoản?</Text>
        <Text style={[styles.ngK, styles.ngKTypo]} onPress={() => navigation.navigate('Register')}>
          Đăng ký
        </Text>
      </View>
      {isModalIndicatorVisible ? <CustomIndicator size={70} /> : null}
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
  textInputContainer: {
    paddingVertical: 8,
  },
  textInputContainer: {
    paddingVertical: 8,
  },
  containerTextInput: {
    marginTop: 10,
    width: '100%',
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
  iconEyePass: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    height: 40,
    borderBottomWidth: 0,
  },
  containerGoogle: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#EFF1F3',
    padding: 12,
  },
  iconGoogle: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  iconContainer: {
    padding: 8,
  },
  iconLayout: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  titleSpaceBlock: {
    marginTop: 16,
  },
  hocClr: {
    color: Color.neutral2,
    fontWeight: '500',
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
    justifyContent: 'center',
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
    marginTop: 16,
  },
  forgotPassword: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    marginTop: 16,
    color: Color.colorBlueviolet,
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    marginTop: 16,
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
  divider: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  spacer: {
    overflow: 'hidden',
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  chaCTi: {
    color: Color.neutral2,
    fontWeight: '500',
  },
  ngK: {
    color: Color.colorDarkorange,
    marginLeft: 8,
    fontWeight: '700',
    textAlign: 'left',
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textField: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 20,
    marginLeft: 10,
  },
});

export default LoginScreen;
