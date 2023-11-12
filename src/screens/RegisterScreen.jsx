import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';

import { Color, FontSize, Padding, Border } from '../components/styles/GlobalStyles';

const RegisterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.signIn, styles.signInFlexBox]}>
      <View style={[styles.title, styles.titleSpaceBlock]}>
        <Text style={styles.ngNhp}>Đăng Ký</Text>
      </View>
      <View>
        <TextInput
          returnKeyType="next"
          icon={require('../assets/icon--alternate-email3x.png')}
          text="abc@gmail.com"
        />
        <TextInput
          returnKeyType="next"
          source={require('../assets/icon--lock-outline3x.png')}
          text="********"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Đăng Ký</Text>
      </TouchableOpacity>

      <View style={[styles.spacer, styles.titleSpaceBlock]} />
      <View style={[styles.footer, styles.titleSpaceBlock]}>
        <Text style={[styles.chaCTi, styles.ngKTypo]}>Đã có tài khoản?</Text>
        <Text style={[styles.ngK, styles.ngKTypo]} onPress={() => navigation.navigate('Login')}>
          Đăng nhập
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signInFlexBox: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  dividerFlexBox: {
    alignItems: 'center',
    flexDirection: 'row',
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
  buttonTypo: {
    fontWeight: '500',
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
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
  iconBackward: {
    overflow: 'hidden',
  },
  navigation: {
    alignSelf: 'stretch',
    alignItems: 'center',
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
    padding: Padding.p_3xs,
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  qunMtKhu: {
    textAlign: 'right',
    color: Color.colorMidnightblue,
  },
  forgotPassword: {
    justifyContent: 'flex-end',
    padding: Padding.p_3xs,
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: '85%',
    backgroundColor: '#643FDB',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconRight: {
    display: 'none',
    marginLeft: 8,
    overflow: 'hidden',
  },
  text: {
    position: 'absolute',
    marginTop: -12,
    marginLeft: -42.5,
    top: '50%',
    left: '50%',
    flexDirection: 'row',
  },
  loginButton: {
    borderRadius: Border.br_base,
    backgroundColor: Color.colorBlueviolet,
    height: 48,
    overflow: 'hidden',
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
  signIn: {
    width: '100%',
    height: 812,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
  },
});

export default RegisterScreen;
