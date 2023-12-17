import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ActivityIndicator } from 'react-native';
import SubHeaderBar from '../../components/headerBar/SubHeaderBar';
import { useNavigation } from '@react-navigation/native';
import { Color } from '../../components/styles/GlobalStyles';
import Icon from '../../components/common/Icon';
import CustomPopup from '../../components/popup/CustomPopup';
import { accessTokenKey } from '../../constant/constant';
import { getAccessToken } from '../../configs/utils/getAccessToken';
import { axiosAuthDel, axiosAuthGet } from '../../configs/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailClientScreen = ({ route }) => {
  const navigation = useNavigation();
  const { selectedItem } = route.params;
  const [data, setData] = useState(selectedItem);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showPopup = () => setPopupVisible(true);
  const hidePopup = () => setPopupVisible(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem(accessTokenKey);

      const response = await axiosAuthGet(`/client/get-client-detail/${data._id}`, token);

      console.log('Cient info:', response);
      setData(response.client);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data when the screen is focused
    const unsubscribe = navigation.addListener('focus', fetchData);

    // Cleanup the listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem(accessTokenKey);
      await axiosAuthDel(`/client/delete-client/${data._id}`, token);
      console.log('Client deleted successfully');

      hidePopup();
      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting client:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigation.navigate('AddClient', { editData: data });
  };

  const formatBirthday = (birthdayString) => {
    const date = new Date(birthdayString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const mapGenderToVietnamese = (gender) => {
    return gender === 'male' ? 'Nam' : gender === 'female' ? 'Nữ' : '';
  };

  const renderDetailItem = (iconSource, label, text) => (
    <View style={styles.detailItem}>
      <Icon source={iconSource} style={styles.icon} color={Color.neutral2} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SubHeaderBar
        onBackPress={() => {
          navigation.goBack();
        }}
        onDeletePress={showPopup}
        onEditPress={handleEdit}
      />

      <CustomPopup
        visible={isPopupVisible}
        title="Xác nhận"
        message="Bạn có chắc muốn xóa khách hàng này?"
        onCancel={hidePopup}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />

      {/* Big Avatar */}
      <Image style={styles.avatar} source={{ uri: data.avatar }} />

      {/* Client Details */}
      <View style={styles.detailsContainer}>
        {renderDetailItem(
          require(`../../assets/icons/PersonOutline.png`),
          'Họ và Tên',
          data.fullName,
        )}
        {renderDetailItem(
          require(`../../assets/icons/Cake.png`),
          'Ngày Sinh',
          formatBirthday(data.dateOfBirth),
        )}
        {renderDetailItem(
          require(`../../assets/icons/Gender.png`),
          'Giới Tính',
          mapGenderToVietnamese(data.gender),
        )}
        {renderDetailItem(
          require(`../../assets/icons/Phone.png`),
          'Số Điện Thoại',
          data.phoneNumber,
        )}
        {renderDetailItem(require(`../../assets/icons/Email.png`), 'Email', data.email)}
        {renderDetailItem(require(`../../assets/icons/Location.png`), 'Địa Chỉ', data.address)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.neutral4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    alignSelf: 'center',
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 16,
    marginRight: 8,
    width: '30%',
    color: Color.neutral2,
    alignSelf: 'flex-start',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
});

export default DetailClientScreen;
