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
} from 'react-native';

import { Color, Padding } from '../components/styles/GlobalStyles';
import { axiosAuthGet } from '../configs/axiosInstance';
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
    <View style={styles.container}>
      <MyStatusBar backgroundColor={Color.colorMidnightblue} />
      <Toolbar />
      <View style={styles.contentProfile}>
        <TouchableOpacity
          style={styles.lineItem}
          onPress={() => navigation.navigate('DetailProfileScreen')}
        >
          <Text style={styles.labelInput}>Thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('StatisticsScreen')}>
          <Text style={styles.labelInput}>Thống kê</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ContractsScreen')}>
          <Text style={styles.labelInput}>Hợp đồng</Text>
        </TouchableOpacity>

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
  lineItem: {
    flexDirection: 'row',
  },
});

export default ProfileScreen;
