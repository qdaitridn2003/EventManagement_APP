import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { getAccessToken } from '../../configs/utils/getAccessToken';
import { Color, Padding } from '../../components/styles/GlobalStyles';
import Icon from '../../components/common/Icon';
import CustomInput from '../../components/common/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import { accessTokenKey } from '../../constant/constant';
import { axiosAuthGet, axiosAuthPost, axiosPost } from '../../configs/axiosInstance';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [inputs, setInputs] = useState({
    fullName: '',
    birthDay: '1/1/2023',
    gender: '',
    phone: '',
    email: '',
    address: '',
    avatar: '',
  });
  console.log(inputs.avatar);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
    const tempDate = new Date(currentDate);
    const fDate =
      tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
    handleOnChange(fDate, 'birthDay');
  };

  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const imagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Image: ', result.assets[0]);

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const formData = new FormData();
      const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const tailFile = fileName.split('.')[1];
      formData.append('avatar', {
        uri: imageUri,
        originalname: result.assets[0].fileName,
        type: `${result.assets[0].type}/${tailFile}`,
      });
      const base64Image = result.canceled;
      handleOnChange(imageUri, 'avatar');
      const accessToken = await AsyncStorage.getItem(accessTokenKey);

      const responeImage = await axiosPost(
        '/employee/upload-avatar-employee',
        { avatar: formData },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      console.log(responeImage);
    }
  };

  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem(accessTokenKey);
      console.log(accessToken);
      const respone = await axiosAuthGet('/employee/get-employee-profile', accessToken);
      const employee = respone.employee;
      const dateString = employee.dateOfBirth;
      const formattedDate = format(new Date(dateString), 'dd/MM/yyyy');
      setInputs({
        fullName: employee.fullName,
        birthDay: formattedDate,
        gender: employee.gender,
        phone: employee.phoneNumber,
        email: employee.email,
        address: employee.address,
        avatar: employee.avatar,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containerToolBar}>
          <TouchableOpacity onPress={() => navigation.navigate('DetailProfileScreen')}>
            <Image source={require('../../assets/icon--backward3x.png')} style={styles.btnBack} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Chỉnh sửa</Text>
        </View>
        <View style={styles.containerAvatar}>
          <TouchableOpacity onPress={imagePicker}>
            {inputs.avatar === null ? (
              <Image source={require('../../assets/icons/AddAvatar.jpeg')} style={styles.avatar} />
            ) : (
              <Image source={{ uri: inputs.avatar }} style={styles.avatar} />
            )}
          </TouchableOpacity>
          <View style={styles.iconAddPhoto}>
            <Icon source={require('../../assets/icons/AddPhoto.png')} />
          </View>
          <Text style={styles.textTutorial}>Nhấn vào hình để tải lên ảnh mới</Text>
        </View>
        <View style={styles.containerInput}>
          <CustomInput
            iconName="account-outline"
            label="Họ và tên"
            value={inputs.fullName}
            onChangeText={(text) => handleOnChange(text, 'fullName')}
          />
        </View>

        <Text style={styles.labelInput}>Ngày sinh</Text>
        <TouchableOpacity style={styles.textFlexBox} onPress={() => setShowDate(true)}>
          <Image style={styles.logoEvent} source={require('../../assets/icons/Cake.png')} />
          <Text style={styles.dashboard}>{inputs.birthDay}</Text>
        </TouchableOpacity>
        {showDate ? (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode={'date'}
            display="default"
            onChange={onChangeDate}
          />
        ) : null}

        <Text style={styles.label}>Giới tính</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 14 }}>
            <Text style={styles.textRadioButton}>Nam</Text>
            <RadioButton
              value="Nam"
              status={inputs.gender === 'male' ? 'checked' : 'unchecked'}
              onPress={() => handleOnChange('male', 'gender')}
            />
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 20 }}>
            <Text style={styles.textRadioButton}>Nữ</Text>
            <RadioButton
              value="Nữ"
              status={inputs.gender === 'female' ? 'checked' : 'unchecked'}
              onPress={() => handleOnChange('female', 'gender')}
            />
          </View>
        </View>

        <CustomInput
          label="Email"
          iconName="email-outline"
          value={inputs.email}
          onChangeText={(text) => handleOnChange(text, 'email')}
        />

        <CustomInput
          label="Số điện thoại"
          iconName="phone-outline"
          value={inputs.phone}
          onChangeText={(text) => handleOnChange(text, 'phone')}
        />

        <CustomInput
          iconName="map-outline"
          label="Địa chỉ"
          value={inputs.address}
          onChangeText={(text) => handleOnChange(text, 'address')}
        />

        <CustomButton title="Lưu thay đổi" />
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  containerToolBar: {
    flexDirection: 'row',
    width: '100%',
  },
  btnBack: {
    width: 40,
    height: 40,
    padding: 10,
  },
  textTitle: {
    justifyContent: 'center',
    fontSize: 20,
    paddingVertical: 7,
    marginLeft: '22%',
    fontWeight: 'bold',
  },
  containerAvatar: {
    height: 'auto',
    alignItems: 'center',
    paddingVertical: 16,
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 90,
  },
  iconAddPhoto: {
    position: 'absolute',
    padding: 4,
    backgroundColor: '#fff',
    top: '60%',
    left: '60%',
    borderRadius: 90,
  },
  labelInput: {
    marginTop: 16,
    color: '#1C1243',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoEvent: {
    marginLeft: 8,
    height: 24,
    width: 24,
    margin: 7,
  },
  dashboard: {
    fontSize: 16,
    lineHeight: 29,
    textAlign: 'left',
    color: Color.colorMidnightblue,
    fontWeight: '700',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textRadioButton: {
    fontWeight: '500',
    fontSize: 16,
    marginTop: 7,
  },
  textTutorial: {
    marginTop: 16,
    color: Color.primary,
    fontSize: 14,
  },
});
