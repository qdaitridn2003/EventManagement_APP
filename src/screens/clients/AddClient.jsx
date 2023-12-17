import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';

import { Color, FontSize, Padding } from '../../components/styles/GlobalStyles';
import MyCalendar from '../items/MyCalendar';
import SubHeaderBar from '../../components/headerBar/SubHeaderBar';
import { accessTokenKey } from '../../constant/constant';
import { getAccessToken } from '../../configs/utils/getAccessToken';
import { axiosAuthPost, axiosAuthPut } from '../../configs/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/common/CustomInput';
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import IconButton from '../../components/common/IconButton';
import CustomButton from '../../components/common/CustomButton';

const AddClient = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const { editData } = route.params || {};

  const [fullName, setFullName] = useState(editData?.fullName || '');
  const [dateOfBirth, setDateOfBirth] = useState(editData?.dateOfBirth || '');
  const [gender, setGender] = useState(editData?.gender || '');
  const [phoneNumber, setPhoneNumber] = useState(editData?.phoneNumber || '');
  const [email, setEmail] = useState(editData?.email || '');
  const [address, setAddress] = useState(editData?.address || '');

  useEffect(() => {
    if (editData) {
      setFullName(editData.fullName);
      setDateOfBirth(editData.dateOfBirth);
      setGender(editData.gender);
      setPhoneNumber(editData.phoneNumber);
      setEmail(editData.email);
      setAddress(editData.address);
    }
  }, [editData]);

  const handleDateConfirm = (date) => {
    // Format the selected date to '2023-11-11T00:00:00.000Z'
    const formattedDate = moment(date).toISOString();
    setDateOfBirth(formattedDate);
    setDatePickerVisibility(false);
  };

  const addNewClient = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem(accessTokenKey);
      await axiosAuthPost('/client/create-info-client', token, {
        fullName,
        dateOfBirth,
        gender,
        phoneNumber,
        email,
        address,
      });

      console.log('Client added successfully');

      navigation.goBack();
    } catch (error) {
      console.error('Error adding client:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem(accessTokenKey);
      await axiosAuthPut(`/client/update-info-client/${editData._id}`, token, {
        fullName,
        dateOfBirth,
        gender,
        phoneNumber,
        email,
        address,
      });

      console.log('Client updated successfully');

      navigation.goBack();
    } catch (error) {
      console.error('Error updating client:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SubHeaderBar
        title={editData ? 'Sửa khách hàng' : 'Thêm khách hàng'}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <CustomInput
          label={'Họ và tên'}
          placeholder="Họ và tên khách hàng"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

        {/* Date of Birth */}
        <Text style={styles.label}>Ngày sinh</Text>
        <View style={styles.datePicker}>
          <IconButton
            iconSource={require('../../assets/icons/Cake.png')}
            isSizeSmall={true}
            onPress={() => setDatePickerVisibility(true)}
          />

          {/* Display selected date in DD-MM-YYYY format */}
          <Text style={styles.datePickerText}>
            {dateOfBirth ? moment(dateOfBirth).format('DD-MM-YYYY') : 'Chọn ngày sinh'}
          </Text>
        </View>

        <View>
          <Text style={styles.label}>Giới tính</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender}>
              <RadioButton.Item label="Nam" value="male" />
              <RadioButton.Item label="Nữ" value="female" />
            </RadioButton.Group>
          </View>
        </View>

        <CustomInput
          label={'Số điện thoại'}
          placeholder="0000 000 000"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <CustomInput
          label={'Email'}
          placeholder="Địa chỉ email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <CustomInput
          label={'Địa chỉ'}
          placeholder="Số nhà, tên đường, quận, thành phố"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        {/* Add client button */}
        <CustomButton
          title={editData ? 'Lưu thay đổi' : 'Thêm khách hàng'}
          onPress={editData ? updateClient : addNewClient}
        />
      </ScrollView>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={new Date(2000, 0, 1)}
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.neutral4,
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  label: {
    marginVertical: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default AddClient;
