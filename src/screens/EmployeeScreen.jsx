import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DummyDataEmployee from './employees/DummyDataEmployee';
import List from './employees/ListEmployee';
import SearchBar from './employees/SearchBar';
import { Border, Color, FontSize, Padding } from '../components/styles/GlobalStyles';
import { axiosAuthGet } from '../configs/axiosInstance';
import { accessTokenKey } from '../constant/constant';

const ToolbarEmployee = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.nameScreenAndBtnAdd}>
      <View style={styles.textFlexBox}>
        <Text style={styles.dashboard}>Nhân viên</Text>
        <Image style={styles.logoEvent} source={require('../assets/icon--employee2.png')} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('AddEmployee')}>
        <Image style={styles.buttonFab} source={require('../assets/plus-icon.png')} />
      </TouchableOpacity>
    </View>
  );
};

const EmployeeScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem(accessTokenKey);
      const respone = await axiosAuthGet('/employee/get-employee-list', token, {});
      const listEmployee = respone.listEmployee;

      const data = listEmployee.map((employee) => ({
        id: employee._id,
        name: employee.fullName,
        role: employee.auth.role.name,
        image: employee.avatar,
      }));
      console.log(data);
      setData(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ToolbarEmployee />
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <List searchPhrase={searchPhrase} data={data} setClicked={setClicked} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 812,
    paddingVertical: Padding.p_base,
    paddingHorizontal: Padding.p_5xl,
    alignItems: 'center',
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  nameScreenAndBtnAdd: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboard: {
    fontSize: FontSize.title24Bold_size,
    lineHeight: 29,
    textAlign: 'left',
    color: Color.colorMidnightblue,
    fontWeight: '700',
  },
  logoEvent: {
    marginLeft: 8,
    height: 24,
    width: 24,
  },
  buttonFab: {
    width: 44,
    height: 44,
    overflow: 'hidden',
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorBlueviolet,
  },
  title: {
    width: '100%',
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: '10%',
  },
});

export default EmployeeScreen;
