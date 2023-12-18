import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import PopupScreen from './PopupScreen';
import { Color, FontSize, Padding } from '../../../src/components/styles/GlobalStyles';
import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import CustomPassInput from '../../components/common/CustomPassInput';
import Icon from '../../components/common/Icon';
import { axiosGet, axiosPost } from '../../configs/axiosInstance';
import { otpSecretKey, emailRegisterKey } from '../../constant/constant';
import { AppContext } from '../../contexts/AppContext';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { popup } = useContext(AppContext);
  const [isModalVisible, setisModalVisible] = popup;
  const [listRole, setListRole] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Chọn chức vụ');
  const [roleId, setRoleId] = useState('');
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleItemSelect = (index) => {
    if (index === 0) {
      setRoleId('65605b22760a95942302cadd');
    } else if (index === 1) {
      setRoleId('65605b56760a95942302cadf');
    } else if (index === 2) {
      setRoleId('65605b77760a95942302cae1');
    } else if (index === 3) {
      setRoleId('65605b7d760a95942302cae3');
    } else if (index === 4) {
      setRoleId('65605b9c760a95942302cae5');
    } else if (index === 5) {
      setRoleId('65605baf760a95942302cae7');
    } else if (index === 6) {
      setRoleId('65605bbc760a95942302cae9');
    } else if (index === 7) {
      setRoleId('65605bd6760a95942302caeb');
    }
  };

  const registerHandler = async () => {
    Keyboard.dismiss();
    const response = await axiosPost('/auth/sign-up', {
      username: inputs.email,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
      roleId,
    });
    console.log(response);
    if (!inputs.email) {
      handleErrors('Vui Lòng nhập email', 'email');
    } else if (response.message === 'Email is already exist') {
      handleErrors('Email này đã tồn tại', 'email');
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleErrors('Vui lòng nhập email đúng định dạng', 'email');
    }
    if (!inputs.password) {
      handleErrors('Vui lòng nhập mật khẩu', 'password');
    } else if (inputs.password.length < 6) {
      handleErrors('Mật khẩu ít nhất phải có 6 ký tự', 'password');
    }

    if (!inputs.confirmPassword) {
      handleErrors('Vui lòng xác nhận lại mật khẩu', 'confirmPassword');
    } else if (inputs.confirmPassword.length < 6) {
      handleErrors('Mật khẩu ít nhất phải có 6 ký tự', 'confirmPassword');
    } else if (inputs.confirmPassword !== inputs.password) {
      handleErrors('Xác nhận mật khẩu không khớp với mật khẩu đăng ký', 'confirmPassword');
    }

    if (roleId === '') {
      handleErrors('Vui lòng chọn chức vụ', 'roleId');
    }
    console.log(response);
    if (response.otpSecret) {
      await AsyncStorage.setItem(otpSecretKey, response.otpSecret);
      await AsyncStorage.setItem(emailRegisterKey, inputs.email);
      setisModalVisible(true);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await axiosGet('/role/get-list-role');
      const list = response.map((item, index) => {
        return item.name;
      });
      setListRole(list);
    })();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={[styles.title, styles.titleSpaceBlock]}>
        <Text style={styles.ngNhp}>Đăng ký tài khoản</Text>
      </View>
      <CustomInput
        placeholder="Nhập email đăng ký"
        label="Email"
        keyboardType="email-address"
        onChangeText={(text) => handleOnChange(text, 'email')}
        error={errors.email}
        onFocus={() => handleErrors(null, 'email')}
      />

      <Text style={styles.textField}>Chức vụ</Text>

      <View style={{ padding: 2, flexDirection: 'row' }}>
        <ModalDropdown
          defaultIndex={0}
          options={listRole}
          defaultValue={selectedOption}
          onSelect={handleItemSelect}
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownDropdown}
          dropdownTextStyle={styles.dropdownDropdownText}
          dropdownTextContainerStyle={{ width: '100%' }}
          animated
        />
        <Icon
          style={{ position: 'absolute', left: '90%', top: '40%' }}
          source={require('../../assets/icons/ArrowDropDown.png')}
          color={Color.colorBlack}
        />
      </View>

      {errors.roleId ? (
        <View style={styles.viewError}>
          <View style={{ marginTop: 2.5 }}>
            <Icon
              source={require('../../assets/icons/ErrorOutline.png')}
              color={Color.semanticRed}
              size="small"
            />
          </View>
          <Text style={styles.textError}>{errors.roleId}</Text>
        </View>
      ) : null}

      <CustomPassInput
        label="Mật khẩu"
        placeholder="Nhập mật khẩu đăng ký"
        onChangeText={(text) => handleOnChange(text, 'password')}
        error={errors.password}
        onFocus={() => handleErrors(null, 'password')}
      />

      <CustomPassInput
        label="Nhập lại mật khẩu"
        placeholder="Nhập lại mật khẩu đăng ký"
        onChangeText={(text) => handleOnChange(text, 'confirmPassword')}
        error={errors.confirmPassword}
        onFocus={() => handleErrors(null, 'confirmPassword')}
      />
      <CustomButton title="Đăng ký" onPress={registerHandler} />

      <View style={[styles.divider, styles.titleSpaceBlock]}>
        <View style={styles.dividerLayout} />
        <Text style={[styles.hoc, styles.hocClr]}>Hoặc</Text>
        <View style={[styles.dividerItem, styles.dividerLayout]} />
      </View>

      <TouchableOpacity
        onPress={() => ToastAndroid.show('Tính năng đang được phát triển', ToastAndroid.SHORT)}
      >
        <View style={styles.containerGoogle}>
          <Image
            style={styles.iconGoogle}
            contentFit="cover"
            source={require('../../assets/icon--google3x.png')}
          />

          <Text>Đăng ký bằng Google</Text>
        </View>
      </TouchableOpacity>

      <View style={[styles.spacer, styles.titleSpaceBlock]} />
      <View style={[styles.footer, styles.titleSpaceBlock]}>
        <Text style={[styles.chaCTi, styles.ngKTypo]}>Đã có tài khoản?</Text>
        <Text style={[styles.ngK, styles.ngKTypo]} onPress={() => navigation.navigate('Login')}>
          Đăng nhập
        </Text>
      </View>
      {isModalVisible === true ? <PopupScreen /> : null}
    </ScrollView>
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
  containerGoogle: {
    marginTop: 10,
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
  iconLayout: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  titleSpaceBlock: {
    marginTop: 10,
    alignSelf: 'stretch',
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
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 20,
  },
  drowDownError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  textError: {
    marginLeft: 5,
    color: Color.semanticRed,
  },
  viewError: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 16,
  },
  dropdown: {
    marginTop: 10,
    width: '100%',
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    elevation: 3,
  },

  dropdownText: {
    fontSize: 16,
    paddingHorizontal: 12,
    width: '100%',
    paddingVertical: 12,
  },
  dropdownDropdown: {
    width: '82%',
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
  dropdownDropdownText: {
    fontSize: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
});

export default RegisterScreen;
