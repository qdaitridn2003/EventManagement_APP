import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { Color, Border } from '../../components/styles/GlobalStyles';
import { AppContext } from '../../contexts';

const ItemListTransport = ({ id, name, image }) => {
  const navigation = useNavigation();
  const { dataIdTransport } = useContext(AppContext);
  const [idTransport, setIdTransport] = dataIdTransport;

  const handleClickItem = () => {
    setIdTransport(id);
    // navigation.navigate('TransportScreen');
  };
  const handleClickDetail = () => {
    handleClickItem();
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatarImage}
          source={{ uri: image }}
          onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
        />
      </View>
      <View style={styles.line1}>
        <Text style={styles.textName}>{name}</Text>
        <Image style={styles.more} source={require('../../assets/icon--more-vert3.png')} />
      </View>
      <TouchableOpacity onPress={handleClickItem}></TouchableOpacity>
    </View>
  );
};

export default ItemListTransport;

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
    marginTop: 6,
    flexDirection: 'row',
  },
  statusGreen: {
    marginTop: 6,
    flexDirection: 'row',
  },
  statusRed: {
    marginTop: 6,
    flexDirection: 'row',
  },
  statusBlue: {
    marginTop: 6,
    flexDirection: 'row',
  },
  textStatusGreen: {
    alignSelf: 'center',
    fontSize: 15,
    color: '#009900',
    fontWeight: 'bold',
  },
  textStatusRed: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF3300',
  },
  textStatusBlue: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3366CC',
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
