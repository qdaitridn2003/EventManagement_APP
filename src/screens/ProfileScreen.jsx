import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';

import { Color, Padding } from '../components/styles/GlobalStyles';

const { height, width } = Dimensions.get('window');

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const Toolbar = () => {
  return (
    <View style={styles.infoImage}>
      <TouchableOpacity>
        <Image
          style={styles.avatar}
          resizeMode="cover"
          source={require('../assets/avatar-28x283x.png')}
        />
      </TouchableOpacity>
      <Text style={styles.textInfo}>Admin</Text>
    </View>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MyStatusBar backgroundColor={Color.colorMidnightblue} />
      <Toolbar />
      <View style={styles.contentProfile}>
        <TouchableOpacity onPress={() => navigation.navigate('DetailProfileScreen')}>
          <Text style={styles.labelInput}>Thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.labelInput}>Đổi mật khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.labelInput}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    width: '100%',
  },
  contentProfile: {
    width: '100%',
    height: 812,
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_5xl,
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  infoImage: {
    height: height * 0.3,
    backgroundColor: Color.colorText,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfo: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    top: 15,
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
});

export default ProfileScreen;
