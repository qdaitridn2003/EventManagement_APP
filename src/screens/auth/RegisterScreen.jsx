import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Modal, Keyboard } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { axiosGet, axiosPost } from '../../configs/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PopupScreen from './PopupScreen';
import { Color, FontSize, Padding } from '../../../src/components/styles/GlobalStyles';
import { AppContext } from '../../contexts/AppContext';
import { otpSecretKey, emailRegisterKey } from '../../constant/constant';
import { Input } from '../../components';
import CustomInput from '../../components/common/CustomInput';
import CustomPassInput from '../../components/common/CustomPassInput';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from '../../components/common/Icon';
import CustomButton from '../../components/common/CustomButton';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { popup } = useContext(AppContext);
  const [isModalVisible, setisModalVisible] = popup;
  const [openDropdown, setopenDropdown] = useState(false);
  const [listRole, setListRole] = useState([]);
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

  const registerHandler = async () => {
    Keyboard.dismiss();
    const response = await axiosPost('/auth/sign-up', {
      username: inputs.email,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword,
      roleId: roleId,
    });

    if (!inputs.email) {
      handleErrors('Please input Email', 'email');
    } else if (response.message === 'Email is already exist') {
      handleErrors('Email is already exist', 'email');
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleErrors('Please input valid Email', 'email');
    }
    if (!inputs.password) {
      handleErrors('Please input Password', 'password');
    } else if (inputs.password.length < 6) {
      handleErrors('Password must be at least have 6 characters', 'password');
    }

    if (!inputs.confirmPassword) {
      handleErrors('Please input Confirm Password', 'confirmPassword');
    } else if (inputs.confirmPassword.length < 6) {
      handleErrors('Confirm password must be at least have 6 characters', 'confirmPassword');
    } else if (!inputs.confirmPassword === inputs.password) {
      handleErrors('Confirm password must be matches to the current password', 'confirmPassword');
    }

    if (roleId === '') {
      handleErrors('Please choose a role', 'roleId');
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
      const list = response.map((item) => {
        return { label: item.name, value: item._id };
      });
      setListRole(list);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <View style={[styles.title, styles.titleSpaceBlock]}>
        <Text style={styles.ngNhp}>Đăng Ký Tài Khoản</Text>
      </View>

      <CustomInput
        placeholder="Nhập email đăng ký"
        label={'Email'}
        onChangeText={(text) => handleOnChange(text, 'email')}
        error={errors.email}
        onFocus={() => handleErrors(null, 'email')}
      />

      <Text style={styles.textField}>Chức vụ</Text>
      <DropDownPicker
        underlineColor
        style={[styles.containerTextInput, errors.roleId ? styles.drowDownError : null]}
        items={listRole}
        open={openDropdown}
        setOpen={() => {
          setopenDropdown(!openDropdown);
          handleErrors(null, 'roleId');
          Keyboard.dismiss();
        }}
        value={roleId}
        setValue={(val) => setRoleId(val)}
        maxHeight={200}
        autoScroll
        placeholder="Select your position"
        showArrowIcon={true}
        showTickIcon={true}
        disableBorderRadius={false}
      />
      {errors.roleId ? (
        <View style={styles.viewError}>
          <View style={{ marginTop: 2.5 }}>
            <Icon
              source={require('../../assets/icons/ErrorOutline.png')}
              color={Color.semanticRed}
              size={'small'}
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

      <TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    width: '100%',
    height: 812,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
  },
  containerTextInput: {
    marginTop: 10,
    width: '100%',
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 3,
    paddingHorizontal: 12,
    overflow: 'hidden',
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
    marginTop: 20,
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
});

export default RegisterScreen;
