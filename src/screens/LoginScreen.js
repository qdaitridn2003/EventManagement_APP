import * as React from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Color, FontSize, FontFamily, Padding, Border } from '../components/styles/GlobalStyles';
import { TextInput } from 'react-native-paper';

const LoginScreen = () => {
  return (
    <View style={[styles.signIn, styles.signInFlexBox]}>
      <View style={[styles.navigation, styles.dividerFlexBox]}>
        <Image
          style={[styles.iconBackward, styles.iconLayout]}
          contentFit="cover"
          source={require('../assets/icon--backward.png')}
        />
      </View>
      <View style={[styles.title, styles.titleSpaceBlock]}>
        <Text style={styles.ngNhp}>Đăng Nhập</Text>
      </View>
      <View>
        <TextInput
          returnKeyType="next"
          icon={require('../assets/icon--alternate-email.png')}
          text="abc@gmail.com"
        />
        <TextInput
          returnKeyType="next"
          // source={require('../assets/icon--lock-outline@3x.png')}
          text="********"
        />
      </View>

      <View style={[styles.forgotPassword, styles.titleSpaceBlock]}>
        <Text style={[styles.qunMtKhu, styles.buttonTypo]}>Quên mật khẩu?</Text>
      </View>

      <View style={[styles.loginButton, styles.titleSpaceBlock]}>
        <Pressable style={[styles.button, styles.buttonTypo]}>
          <Text style={styles.text}>Đăng nhập</Text>
        </Pressable>
        <Image
          style={[styles.iconRight, styles.iconLayout]}
          contentFit="cover"
          source={require('../assets/icon--right.png')}
        />
      </View>

      <View style={[styles.divider, styles.titleSpaceBlock]}>
        <View style={styles.dividerLayout} />
        <Text style={[styles.hoc, styles.hocClr]}>Hoặc</Text>
        <View style={[styles.dividerItem, styles.dividerLayout]} />
      </View>

      <View style={[styles.loginButton, styles.titleSpaceBlock]}>
        <Pressable style={[styles.button, styles.buttonTypo]}>
          <Text style={styles.text}>Đăng nhập bằng Google</Text>
        </Pressable>
        <Image
          style={[styles.iconRight, styles.iconLayout]}
          contentFit="cover"
          // source={require('../assets/icon--google@3x.png')}
        />
      </View>

      <View style={[styles.spacer, styles.titleSpaceBlock]} />
      <View style={[styles.footer, styles.titleSpaceBlock]}>
        <Text style={[styles.chaCTi, styles.ngKTypo]}>Chưa có tài khoản?</Text>
        <Text style={[styles.ngK, styles.ngKTypo]}>Đăng ký</Text>
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
    fontFamily: FontFamily.headlines16Medium,
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
    fontFamily: FontFamily.headlines16Medium,
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
    fontFamily: FontFamily.headlines16Medium,
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
    color: Color.colorWhite,
    textAlign: 'center',
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
    fontFamily: FontFamily.headlines16Medium,
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

export default LoginScreen;
