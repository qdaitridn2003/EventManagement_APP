import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// Rename the component directly in the import statement
import DummyDataClients from './clients/DummyDataClients';
import { Border, Color, FontSize, Padding } from '../components/styles/GlobalStyles';

// Navigation Clients
const HeaderClients = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.nameScreenAndBtnAdd}>
      <View style={styles.textFlexBox}>
        <Text style={styles.dashboard}>Khách hàng</Text>
        <Image style={styles.logoClients} source={require('../assets/Group.png')} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('AddClient')}>
        <Image style={styles.buttonFab} source={require('../assets/plus-icon.png')} />
      </TouchableOpacity>
    </View>
  );
};

// Search
// Directly export the component with the desired name
const CustomSearchComponent = () => {
  return (
    <View style={styles.SearchClients}>
      <Image style={styles.imageSearch} source={require('../assets/vector.png')} />
      <View style={[styles.text, styles.inputSearch]}>
        <Text style={[styles.search, styles.text1Clr]}>Tìm khách hàng</Text>
      </View>
      <Image
        style={[styles.vectorIcon1, styles.imageTune]}
        source={require('../assets/tune-icon.png')}
      />
    </View>
  );
};

const ClientListItem = ({ data }) => {
  // Replace this with your actual rendering logic for a single client item
  return (
    <View style={styles.clientContainer}>
      <Image style={styles.clientAvatar} source={require('../assets/avatar-28x2813x.png')} />
      <View style={styles.clientInfo}>
        <Text style={styles.clientName}>{data.name}</Text>
        <Text style={styles.clientRole}>{data.details}</Text>
      </View>
    </View>
  );
};

const ClientScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderClients />
      <CustomSearchComponent />

      <FlatList
        data={DummyDataClients}
        renderItem={({ item }) => <ClientListItem data={item} />}
        keyExtractor={item => item.id}
        style={{ height: '100%', width: '100%' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  logoClients: {
    marginLeft: 8,
    height: 24,
    width: 24,
  },
  dashboard: {
    fontSize: FontSize.title24Bold_size,
    lineHeight: 29,
    textAlign: 'left',
    color: Color.colorMidnightblue,
    fontWeight: '700',
  },
  buttonFab: {
    width: 44,
    height: 44,
    overflow: 'hidden',
    borderRadius: Border.br_xs,
    backgroundColor: Color.colorBlueviolet,
  },
  SearchClients: {
    height: 48,
    paddingVertical: 0,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Padding.p_5xl,
    borderRadius: Border.br_base,
    alignSelf: 'stretch',
    backgroundColor: Color.colorWhitesmoke,
    elevation: 10,
  },
  imageSearch: {
    height: 20,
    width: 20,
  },
  imageTune: {
    height: 20,
    width: 20,
    marginLeft: 16,
  },
  inputSearch: {
    marginLeft: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  clientAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clientRole: {
    color: '#888',
  },
});
export default ClientScreen;
