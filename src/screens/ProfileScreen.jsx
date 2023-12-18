import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';

import { Color, Padding } from '../components/styles/GlobalStyles';
import { axiosAuthGet } from '../configs/axiosInstance';
import Icon from '../components/common/Icon';
import { getAccessToken } from '../configs/utils/getAccessToken';
import { accessTokenKey } from '../constant/constant';
import { AppContext } from '../contexts/AppContext';

const { height, width } = Dimensions.get('window');

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { setIsLogin, pagination, loadingFooter } = useContext(AppContext);
  const [dataAvatar, setDataAvatar] = useState('');
  const [dataFullName, setDataFullName] = useState('');
  const [pageData, setPageData] = pagination;
  const [isLoading, setIsLoading] = loadingFooter;
  const [checkData, setCheckData] = useState({});

  const handleLogOut = async () => {
    await AsyncStorage.setItem(accessTokenKey, '');
    setPageData(1);
    setIsLoading(true);
    setIsLogin(false);
  };

  const Toolbar = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        fetchData();
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, [checkData]);
    const fetchData = async () => {
      const accessToken = await AsyncStorage.getItem(accessTokenKey);
      const respone = await axiosAuthGet('/employee/get-employee-profile', accessToken);
      const responeAvatar = respone.employee.avatar;
      const responeFullName = respone.employee.fullName;
      setDataAvatar(responeAvatar);
      setDataFullName(responeFullName);
    };
    return (
      <View style={styles.infoImage}>
        <Image
          style={styles.avatar}
          resizeMode="cover"
          source={dataAvatar ? { uri: dataAvatar } : require('../assets/icons/AddAvatar.jpeg')}
        />
        <Text style={styles.textInfo}>{dataFullName}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} show={false}>
      <MyStatusBar backgroundColor={Color.colorMidnightblue} />
      <Toolbar />
      <View style={styles.contentProfile}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 3,
          }}
        >
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('DetailProfileScreen')}
          >
            <Icon
              source={require('../assets/icons/profileDetail.png')}
              color={'#1C1243'}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.textBox}>Thông tin</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('StatisticsScreen')}
          >
            <Icon
              source={require('../assets/icons/Statistical.png')}
              color={'#1C1243'}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.textBox}>Thống kê</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 3,
          }}
        >
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('ContractsScreen')}
          >
            <Icon
              source={require('../assets/Contract2.png')}
              color={'#1C1243'}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.textBox}>Hợp đồng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Icon
              source={require('../assets/icons/changePass.png')}
              color={'#1C1243'}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.textBox}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate('DeviceScreen')}>
          <Text style={styles.labelInput}>Thiết bị</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => navigation.navigate('TransportScreen')}>
          <Text style={styles.labelInput}>Phương tiện</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.labelInput}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOut}>
          <Text style={styles.labelInput}>Đăng xuất</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: 10,
            paddingHorizontal: 3,
          }}
        >
          <TouchableOpacity style={styles.box} onPress={handleLogOut}>
            <Icon
              source={require('../assets/icons/LogOut.png')}
              color={'#1C1243'}
              style={{ width: 40, height: 40 }}
            />
            <Text style={styles.textBox}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    borderRadius: 90,
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
  box: {
    width: '45%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: 'white',
    elevation: 4,
  },
  textBox: { marginTop: 16, color: '#1C1243', fontWeight: 'bold', fontSize: 16 },
});

export default ProfileScreen;
