import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Color, FontSize, Border } from '../../components/styles/GlobalStyles';

const ItemListContracts = ({ data }) => {
  const navigation = useNavigation();

  const handleItemClick = () => {
    navigation.navigate('DetailContractsScreen', { eventData: data });
  };
  return (
    <View style={styles.container}>
      <View style={styles.line1}>
        <Text style={styles.textName}>Hợp đồng mua bán</Text>
        <Image style={styles.more} source={require('../../assets/icon--more-vert3.png')} />
      </View>
      <TouchableOpacity onPress={handleItemClick}>
        <View style={styles.line2}>
          <Image source={require('../../assets/icon--event2.png')} style={styles.imageCalendar} />
          <Text style={{ alignSelf: 'center' }}>11/09/2023</Text>
        </View>
        <View style={styles.line2}>
          <Image
            source={require('../../assets/icon--person-outline3x.png')}
            style={styles.imageCalendar}
          />
          <Text style={{ alignSelf: 'center' }}>Anh</Text>
        </View>
        <View style={styles.line2}>
          <Image source={require('../../assets/contract.png')} style={styles.imageCalendar} />
          <Text style={{ alignSelf: 'center' }}>Hóa đơn: </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemListContracts;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderRadius: Border.br_base,
    overflow: 'hidden',
    backgroundColor: Color.colorWhitesmoke,
    padding: 20,
  },
  line1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  line2: {
    flexDirection: 'row',
  },
  textName: {
    fontSize: 18,
    lineHeight: 28,
    color: Color.neutral1,
    fontWeight: 'bold',
  },
  more: {
    width: 28,
    height: 28,
  },
  imageCalendar: {
    marginRight: 5,
    width: 24,
    height: 24,
  },
});
