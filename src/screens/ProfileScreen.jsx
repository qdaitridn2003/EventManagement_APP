import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert, Text, TextInput } from 'react-native';

import { Color, Padding } from '../components/styles/GlobalStyles';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleImageClick = () => {
    Alert.alert('Image Clicked!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImageClick} style={styles.touchable}>
        <Image
          style={styles.avatar}
          resizeMode="cover"
          source={require('../assets/avatar-28x283x.png')}
        />
      </TouchableOpacity>

      <Text style={styles.labelInput}>Họ và tên</Text>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../assets/icons8-profile-50.png')}
        />
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="Team Cook" />
      </View>
      <Text style={styles.labelInput}>Email</Text>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../assets/icon--alternate-email3x.png')}
        />
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="abc@gmail.com" />
      </View>
      <Text style={styles.labelInput}>Số điện thoại</Text>
      <View style={styles.containerTextInput}>
        <Image
          style={styles.iconUsername}
          contentFit="cover"
          source={require('../assets/phone-android.png')}
        />
        <TextInput style={styles.textInput} returnKeyType="next" placeholder="0912342667" />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
        <Text style={styles.labelInput}>Đổi mật khẩu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.labelInput}>Đăng xuất</Text>
      </TouchableOpacity>
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
  touchable: {
    alignItems: 'center',
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
