import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

import { Color, FontSize, Padding } from '../components/styles/GlobalStyles';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const ref_input2 = React.useRef();
  return (
    <View style={styles.container}>
      <View style={[styles.title, styles.titleSpaceBlock]}>
        <Text style={styles.ngNhp}>Đăng Ký</Text>
      </View>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../assets/icons8-profile-50.png')}
        />
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="Team Cook" />
      </View>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../assets/icon--alternate-email3x.png')}
        />
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="abc@gmail.com" />
      </View>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../assets/icon--lock-outline3x.png')}
        />
        <TextInput
          underlineColorAndroid="transparent"
          style={styles.textInput}
          returnKeyType="next"
          placeholder="*********"
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
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    width: '100%',
    height: 812,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_base,
  },
  containerTextInput: {
    marginTop: 16,
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
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    height: 40,
  },

  titleSpaceBlock: {
    marginTop: 16,
    alignSelf: 'stretch',
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
});

export default RegisterScreen;
