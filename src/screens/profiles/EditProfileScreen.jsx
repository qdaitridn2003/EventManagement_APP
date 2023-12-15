import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
// import * as FileSystem from 'expo-file-system';

import CustomButton from '../../components/common/CustomButton';
import CustomInput from '../../components/common/CustomInput';
import Icon from '../../components/common/Icon';
import { Color, Padding } from '../../components/styles/GlobalStyles';
import {
  axiosAuthGet,
  axiosAuthPost,
  axiosAuthPut,
  axiosPost,
  axiosPut,
} from '../../configs/axiosInstance';
import { getAccessToken } from '../../configs/utils/getAccessToken';
import { accessTokenKey } from '../../constant/constant';
import { uploadImage } from '../../utils/uploadImageHandler';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isModalIndicator, setIsModalIndicator] = useState(true);
  const [errors, setErrors] = useState({
    fullName: null,
    email: null,
    phone: null,
  });
  const [inputs, setInputs] = useState({
    fullName: '',
    birthDay: '1/1/2023',
    gender: '',
    phone: '',
    email: '',
    address: '',
    avatar: '',
  });
  // console.log(inputs.avatar);
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
    const tempDate = new Date(currentDate);
    const fDate =
      tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
    handleOnChange(fDate, 'birthDay');
  };

  const handleErrors = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleSave = async () => {
    if (!inputs.fullName) {
      handleErrors('Vui lòng không để trống họ và tên', 'fullName');
    }
    if (!inputs.email) {
      handleErrors('Please input Email', 'email');
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleErrors('Please input valid Email', 'email');
    }
    if (!inputs.phone) {
      handleErrors('Vui lòng nhập Số điện thoại', 'phone');
    } else if (inputs.phone.length < 10 || inputs.phone.length > 11) {
      handleErrors('Số điện thoại không hợp lệ', 'phone');
    }
    console.log(errors);
    if (errors.fullName === null && errors.email === null && errors.phone === null) {
      const token = await AsyncStorage.getItem(accessTokenKey);
      const respone = await axiosPut(
        '/employee/update-employee-profile',
        {
          email: inputs.email,
          fullName: inputs.fullName,
          dateOfBirth: inputs.birthDay,
          phoneNumber: inputs.phone,
          gender: inputs.gender,
          address: inputs.address,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(respone);
      ToastAndroid.show('Lưu thành công', ToastAndroid.SHORT);
      navigation.goBack();
    }
  };

  const imagePicker = async () => {
    try {
      const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Image: ', assets[0]);

      if (!canceled) {
        const imageUri = assets[0].uri;
        handleOnChange(imageUri, 'avatar');
        const accessToken = await AsyncStorage.getItem(accessTokenKey);

        const result = await uploadImage(
          '/employee/upload-avatar-employee',
          imageUri,
          'avatar',
          accessToken,
        );
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem(accessTokenKey);
      const respone = await axiosAuthGet('/employee/get-employee-profile', accessToken);
      const employee = respone.employee;
      if (respone) {
        setIsModalIndicator(false);
      }
      const dateString = employee.dateOfBirth;
      const formattedDate = format(new Date(dateString), 'yyyy-MM-dd');
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
        {isModalIndicator ? (
          <ActivityIndicator
            size={'large'}
            color={Color.primary}
            style={styles.activityIndicator}
          />
        ) : (
          <View>
            <View style={styles.containerAvatar}>
              <TouchableOpacity onPress={imagePicker}>
                {inputs.avatar === null ? (
                  <Image
                    source={require('../../assets/icons/AddAvatar.jpeg')}
                    style={styles.avatar}
                  />
                ) : (
                  <Image
                    source={{ uri: inputs.avatar ? inputs.avatar : null }}
                    style={styles.avatar}
                  />
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
                onFocus={() => handleErrors(null, 'fullName')}
                error={errors.fullName}
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
                mode="date"
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
              onFocus={() => handleErrors(null, 'email')}
              error={errors.email}
            />

            <CustomInput
              label="Số điện thoại"
              iconName="phone-outline"
              keyboardType="numeric"
              error={errors.phone}
              onFocus={() => handleErrors(null, 'phone')}
              value={inputs.phone}
              onChangeText={(text) => handleOnChange(text, 'phone')}
            />

            <CustomInput
              iconName="map-outline"
              label="Địa chỉ"
              value={inputs.address}
              onChangeText={(text) => handleOnChange(text, 'address')}
            />

            <CustomButton title="Lưu thay đổi" onPress={handleSave} />
          </View>
        )}
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
    width: '80%',
    textAlign: 'center',
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
  activityIndicator: {
    justifyContent: 'center',
    marginTop: '80%',
    flex: 1,
  },
});
