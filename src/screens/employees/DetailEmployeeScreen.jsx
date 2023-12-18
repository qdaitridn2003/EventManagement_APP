import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import { axiosAuthDel, axiosAuthGet, axiosDel } from '../../configs/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { accessTokenKey } from '../../constant/constant';
import { getAccessToken } from '../../configs/utils/getAccessToken';
import { AppContext } from '../../contexts';
import { Color } from '../../components/styles/GlobalStyles';
import Icon from '../../components/common/Icon';
import CustomIndicator from '../../components/common/CustomIndicator';

const DetailEmployeeScreen = () => {
  const [data, setData] = useState({});
  const navigation = useNavigation();
  const { dataIdEmployee } = useContext(AppContext);
  const [idEmployee] = dataIdEmployee;
  const [isModalIndicator, setIsModalIndicator] = useState(true);
  const [isModalDeleteIndicator, setIsModalDeleteIndicator] = useState(false);
  const { checkData } = useContext(AppContext);
  const [dataChange, setDataChange] = checkData;

  const handleDeleteEmployee = async () => {
    setIsModalDeleteIndicator(true);
    const token = await AsyncStorage.getItem(accessTokenKey);
    const respone = await axiosAuthDel(`/employee/delete-employee/${data.id}`, token);
    console.log(respone);
    setDataChange((prev) => prev + 1);
    navigation.navigate('Employee');
  };

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessToken();
      const respone = await axiosAuthGet(
        `/employee/get-employee-profile/${idEmployee}`,
        accessToken,
      );
      if (respone) {
        setIsModalIndicator(false);
      }
      console.log(respone);
      const employee = respone.employee;
      const dateString = employee.dateOfBirth;
      const formattedDate = format(new Date(dateString), 'dd/MM/yyyy');
      const gender = employee.gender === 'male' ? 'Nam' : 'Nữ';
      setData({
        id: employee._id,
        name: employee.fullName,
        role: employee.auth ? employee.auth.role.name : 'null',
        contract: employee.contract,
        birthDay: formattedDate,
        gender: gender,
        phone: employee.phoneNumber,
        adress: employee.address,
        email: employee.email,
        avatar: employee.avatar,
      });
      console.log(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => navigation.navigate('Employee')}>
          <Image source={require('../../assets/icon--backward3x.png')} style={styles.btnBack} />
        </TouchableOpacity>
        <View style={styles.btnHandle}>
          <TouchableOpacity
            onPress={handleDeleteEmployee}
            style={[styles.btnDelEdit, styles.btnDel]}
          >
            <Image
              source={require('../../assets/icons/DeleteOutline.png')}
              style={{ tintColor: 'white' }}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Employee')}
            style={[styles.btnDelEdit, styles.btnEdit]}
          >
            <Image source={require('../../assets/icons/Edit.png')} style={{ tintColor: 'white' }} />
          </TouchableOpacity> */}
        </View>
      </View>

      {isModalIndicator ? (
        <ActivityIndicator
          size={'large'}
          color={Color.primary}
          style={{ justifyContent: 'center', height: '80%' }}
        />
      ) : (
        <View>
          <View style={styles.containerAvatar}>
            <Image
              source={
                data.avatar ? { uri: data.avatar } : require('../../assets/icons/AddAvatar.jpeg')
              }
              style={styles.avatar}
            />
          </View>
          <View style={styles.containerTextName}>
            <Text style={styles.textName}>{data.name}</Text>
          </View>
          <View style={styles.cotainerInformation}>
            <View style={styles.containerLabel}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
                <Icon
                  source={require('../../assets/icons/BadgeOutline.png')}
                  color={'#A29EB6'}
                  size={'big'}
                />
                <Text style={styles.textLabel}>Chức vụ</Text>
              </View>

              <View style={styles.dash}></View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
                <Icon
                  source={require('../../assets/icons/Cake.png')}
                  color={'#A29EB6'}
                  size={'big'}
                />
                <Text style={styles.textLabel}>Ngày sinh</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Icon
                  source={require('../../assets/icons/Gender.png')}
                  color={'#A29EB6'}
                  size={'big'}
                />
                <Text style={styles.textLabel}>Giới tính</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Icon
                  source={require('../../assets/icons/Phone.png')}
                  color={'#A29EB6'}
                  size={'big'}
                />
                <Text style={styles.textLabel}>Số điện thoại</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16,
                  marginLeft: -3,
                }}
              >
                <Icon
                  source={require('../../assets/icons/Location.png')}
                  color={'#A29EB6'}
                  size={'superBig'}
                />
                <Text style={[styles.textLabel, { marginLeft: 6 }]}>Địa chỉ</Text>
              </View>
            </View>

            {/* -------------------data----------------  */}

            <View style={styles.containerData}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
                <Text style={styles.textData}>{data.role}</Text>
              </View>

              <View style={styles.dash}></View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
                <Text style={styles.textData}>{data.birthDay}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Text style={styles.textData}>{data.gender}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Text style={styles.textData}>{data.phone}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Text style={styles.textData}>{data.adress}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Icon
                source={require('../../assets/icons/Email.png')}
                color={'#A29EB6'}
                size={'big'}
              />
              <Text style={styles.textLabel}>Email</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 90,
              }}
            >
              <Text style={[styles.textData, { width: 180 }]}>{data.email}</Text>
            </View>
          </View>
        </View>
      )}
      {isModalDeleteIndicator ? <CustomIndicator size={70} /> : null}
    </View>
  );
};

export default DetailEmployeeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  btn: {
    flexDirection: 'row',
    width: '100%',
    paddingRight: 30,
  },
  btnBack: {
    width: 40,
    height: 40,
    padding: 10,
  },
  btnHandle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  btnDelEdit: {
    width: 40,
    height: 40,
    borderRadius: 12,
    padding: 8,
  },
  btnDel: {
    backgroundColor: Color.semanticRed,
    marginRight: 8,
  },
  btnEdit: {
    backgroundColor: Color.primary,
  },
  containerAvatar: {
    height: 'auto',
    alignItems: 'center',
    width: 'auto',
    padding: 8,
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 90,
  },
  cotainerInformation: {
    flexDirection: 'row',
  },
  textLabel: {
    color: '#A29EB6',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
    lineHeight: 24,
  },
  containerLabel: {
    height: 'auto',
    width: 152,
  },
  dash: {
    height: 1,
    backgroundColor: '#A29EB6',
  },
  containerData: {
    width: '50%',
    height: 'auto',
    marginLeft: 16,
  },
  textData: {
    color: '#1C1243',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    lineHeight: 24,
  },
  containerTextName: {
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  textName: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
