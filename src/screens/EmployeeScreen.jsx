import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import DummyDataEmployee from './employees/DummyDataEmployee';
import List from './employees/ListEmployee';
import SearchBar from './employees/SearchBar';
import { Border, Color, FontSize, Padding } from '../components/styles/GlobalStyles';

const ToolbarEmployee = () => {
  return (
    <View style={styles.nameScreenAndBtnAdd}>
      <View style={styles.textFlexBox}>
        <Text style={styles.dashboard}>Sự kiện</Text>
        <Image style={styles.logoEvent} source={require('../assets/icon--event2.png')} />
      </View>
      <Image style={styles.buttonFab} source={require('../assets/plus-icon.png')} />
    </View>
  );
};

const EmployeeScreen = () => {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState([]);

  useEffect(() => {
    setFakeData(DummyDataEmployee);
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
      <List searchPhrase={searchPhrase} data={fakeData} setClicked={setClicked} />
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
    width: 24,
    height: 24,
    overflow: 'hidden',
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorBlueviolet,
    padding: 25,
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
