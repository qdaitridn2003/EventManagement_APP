import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import PopupScreen from './PopupScreen';
import { Color, FontSize, Padding } from '../../../src/components/styles/GlobalStyles';
import { AppContext } from '../../contexts/AppContext';

const itemsPosition = [
  { label: 'Giám đốc', value: 'Giám đốc' },
  { label: 'Nhân viên', value: 'Nhân viên' },
  { label: 'Bảo vệ', value: 'Bảo vệ' },
];
const RegisterScreen = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const [openDropdown, setopenDropdown] = useState(false);
  const [currentvalue, setcurrentvalue] = useState([]);

  const { popup } = useContext(AppContext);
  const [isModalVisible, setisModalVisible] = popup;

  const handleBtnRegister = () => {
    setisModalVisible(true);
  };
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const ref_input2 = React.useRef();
  return (
    <View style={styles.container}>
      <View style={[styles.title, styles.titleSpaceBlock]}>
        <Text style={styles.ngNhp}>Đăng Ký Tài Khoản</Text>
      </View>
      <Text style={styles.textField}>Email</Text>
      <View style={styles.containerTextInput}>
        <TextInput
          underlineColor="transparent"
          style={styles.textInput}
          returnKeyType="next"
          placeholder="Email"
        />
      </View>
      <Text style={styles.textField}>Chức vụ</Text>

      <DropDownPicker
        underlineColor
        style={[styles.containerTextInput, { borderWidth: 0 }]}
        items={itemsPosition}
        open={openDropdown}
        setOpen={() => setopenDropdown(!openDropdown)}
        value={currentvalue}
        setValue={val => setcurrentvalue(val)}
        maxHeight={200}
        autoScroll
        placeholder="Select your position"
        showArrowIcon
        showTickIcon
        disableBorderRadius={false}
      />

      <Text style={styles.textField}>Mật Khẩu</Text>
      <View style={styles.containerTextInput}>
        <TextInput
          underlineColor="transparent"
          style={styles.textInput}
          returnKeyType="next"
          placeholder="Mật khẩu"
          secureTextEntry={isPasswordVisible}
        />

        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <Image
            source={
              isPasswordVisible
                ? require('../../assets/eye-icon.png')
                : require('../../assets/eye-off-icon.png')
            }
            style={styles.iconEyePass}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.textField}>Nhập Lại Mật Khẩu</Text>
      <View style={styles.containerTextInput}>
        <TextInput
          underlineColor="transparent"
          style={styles.textInput}
          returnKeyType="next"
          placeholder="Nhập Lại Mật Khẩu"
          secureTextEntry={isPasswordVisible}
        />

        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <Image
            source={
              isPasswordVisible
                ? require('../../assets/eye-icon.png')
                : require('../../assets/eye-off-icon.png')
            }
            style={styles.iconEyePass}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBtnRegister}>
        <Text style={styles.text}>Đăng Ký</Text>
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
    backgroundColor: Color.colorWhite,
    width: '100%',
    height: 812,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
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
    paddingHorizontal: 12,
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
  iconLayout: {
    height: 24,
    width: 24,
    overflow: 'hidden',
  },
  titleSpaceBlock: {
    marginTop: 16,
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

export default RegisterScreen;
