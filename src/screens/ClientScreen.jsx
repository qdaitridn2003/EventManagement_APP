import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Color } from '../components/styles/GlobalStyles';
import { SearchBar } from 'react-native-screens';
import Icon from '../components/common/Icon';
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { axiosAuthGet } from '../configs/axiosInstance';
import { accessTokenKey } from '../constant/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainHeaderBar from '../components/headerBar/MainHeaderBar';
import SubHeaderBar from '../components/headerBar/SubHeaderBar';

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

const ClientScreen = () => {
  const navigation = useNavigation();
  // Data
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem(accessTokenKey);

      const response = await axiosAuthGet('/client/get-client-list', token);

      console.log('ListEmployees', response);
      setData(response.listClient);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data when the screen is focused
    const unsubscribe = navigation.addListener('focus', fetchData);

    // Cleanup the listener when the component is unmounted
    return unsubscribe;
  }, [navigation]);

  // Handle card press
  const handleCardPress = (item) => {
    console.log('Card Pressed:', item.fullName);
    navigation.navigate('DetailClientScreen', { selectedItem: item });
  };

  const handleOverflowPress = (item, menuRef) => {
    setSelectedItem(item);
    menuRef.open();
  };

  const handleMenuSelect = (itemId, option) => {
    // Handle the menu selection for the specified item
    const selectedItem = data.find((item) => item.id === itemId);

    if (selectedItem) {
      if (option === 'save') {
        alert(`Save pressed for ${selectedItem.fullName}`);
      } else if (option === 'delete') {
        alert(`Delete pressed for ${selectedItem.fullName}`);
      }
    }
  };

  // Logic to render each card
  const renderItem = ({ item }) => {
    return (
      // Client card
      <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatarImage}
            source={{ uri: item.avatar }}
            onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
          />
        </View>

        {/* Client name */}
        <Text style={styles.name}>{item.fullName}</Text>

        {/* Pop-up menu */}
        <Menu>
          <MenuTrigger customStyles={styles.triggerStyles}>
            <Icon
              style={styles.overflowIcon}
              source={require('../assets/icons/MoreVert.png')}
              color={Color.neutral2}
              onPress={() => handleOverflowPress(item)}
            />
          </MenuTrigger>

          <MenuOptions customStyles={styles.optionsStyles}>
            <MenuOption onSelect={() => handleMenuSelect(item.id, 'save')}>
              <Text style={styles.popupMenuText}>Sửa</Text>
            </MenuOption>

            <MenuOption onSelect={() => handleMenuSelect(item.id, 'delete')}>
              <Text style={[styles.popupMenuText, { color: 'red' }]}>Xóa</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </TouchableOpacity>
    );
  };

  return (
    <MenuProvider>
      <View style={styles.container}>
        {/* <HeaderClients /> */}
        {/* <CustomSearchComponent /> */}
        {/* <SearchBar /> */}
        <MainHeaderBar
          style={styles.mainHeaderBar}
          iconSource={require('../assets/icons/GroupOutline.png')}
          title={'Khách hàng'}
          onButtonPress={() => {
            navigation.navigate('AddClient');
          }}
        />

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="48" color={Color.primary} />
          </View>
        )}

        {error && (
          <View>
            <Text>Error: {error}</Text>
          </View>
        )}

        {!isLoading && !error && (
          <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id} />
        )}
      </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.neutral4,
  },
  mainHeaderBar: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: Color.neutral4,

    shadowColor: Color.neutral1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 90,
    backgroundColor: Color.neutral3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 22,
    color: Color.neutral1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  overflowIcon: {},
  triggerStyles: {},
  optionsStyles: {
    optionsContainer: {
      padding: 16,
      width: 144,
      borderRadius: 16,
    },
    optionText: {
      fontSize: 16,
    },
  },
  optionStyle: {},
  popupMenuText: {
    fontSize: 16,
  },
});
export default ClientScreen;
