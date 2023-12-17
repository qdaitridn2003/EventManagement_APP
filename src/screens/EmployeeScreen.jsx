import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DummyDataEmployee from './employees/DummyDataEmployee';
import List from './employees/ListEmployee';
import SearchBar from './employees/SearchBar';
import { Border, Color, FontSize, Padding } from '../components/styles/GlobalStyles';
import { axiosAuthGet } from '../configs/axiosInstance';
import { accessTokenKey } from '../constant/constant';
import { AppContext } from '../contexts';

const ToolbarEmployee = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.nameScreenAndBtnAdd}>
      <View style={styles.textFlexBox}>
        <Text style={styles.dashboard}>Nhân viên</Text>
        <Image style={styles.logoEvent} source={require('../assets/icon--employee2.png')} />
      </View>
    </View>
  );
};

const EmployeeScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState([]);
  const [isModalIndicator, setIsModalIndicator] = useState(true);
  const { checkData, pagination, loadingFooter } = useContext(AppContext);
  const [dataChange, setDataChange] = checkData;
  const [pageData, setPageData] = pagination;
  const [isLoading, setIsLoading] = loadingFooter;

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem(accessTokenKey);

      const respone = await axiosAuthGet('/employee/get-employee-list', token, {
        limit: 5,
        page: pageData,
      });

      if (respone) {
        const listEmployee = respone.listEmployee;
        if (pageData === 1) {
          setData(listEmployee);
        } else {
          const dataMore = listEmployee.map((employ) => {
            const employs = employ;
            data.push(employs);
          });
          if (dataMore) {
            setIsLoading(false);
          }
          return dataMore;
        }
        setIsModalIndicator(false);
      }
      if (respone.listEmployee.length === 0) {
        setIsLoading(false);
      }
    })();
    console.log(data);
  }, [dataChange]);

  return (
    <View style={styles.container}>
      <ToolbarEmployee />
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {isModalIndicator ? (
        <ActivityIndicator
          size={40}
          color={Color.primary}
          style={{ height: '80%', justifyContent: 'center' }}
        />
      ) : (
        <List searchPhrase={searchPhrase} data={data} setClicked={setClicked} />
      )}
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
    paddingVertical: 10,
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
