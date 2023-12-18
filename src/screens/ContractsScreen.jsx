import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import FilterBar from './Contracts/FilterBar';
import ItemListContracts from './Contracts/ItemListContracts';
import SearchBar from './Contracts/SearchBar';
import { Padding, Color, FontSize, Border } from '../components/styles/GlobalStyles';
import { axiosAuthGet } from '../configs/axiosInstance';
import { accessTokenKey } from '../constant/constant';

const ContractsHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.nameScreenAndBtnAdd}>
      <View style={styles.textFlexBox}>
        <Text style={styles.dashboard}>Hợp đồng</Text>
        <Image style={styles.logoEvent} source={require('../assets/contract.png')} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('AddContracts')}>
        <Image style={styles.buttonFab} source={require('../assets/plus-icon.png')} />
      </TouchableOpacity>
    </View>
  );
};

const ContractsScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [contracts, setContracts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [filteredContracts, setFilteredContracts] = useState([]);

  const listFilter = [
    { status: 'Tất cả' },
    { status: 'Đang hoạt động' },
    { status: 'Hoàn thành' },
    { status: 'Đã hủy' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem(accessTokenKey);
        const response = await axiosAuthGet('/contract/get-list-contract', accessToken, {
          limit: Infinity,
        });

        if (response) {
          const listContract = response.listContract;
          const data = listContract.map((contract) => ({
            id: contract._id,
            name: contract.name,
            startDate: contract.startDate,
            endDate: contract.endDate,
            status: contract.status,
          }));

          data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

          // Lọc dữ liệu theo trạng thái được chọn
          const filteredData =
            selectedStatus === 'Tất cả'
              ? data
              : data.filter((item) => item.status === selectedStatus);

          setContracts(filteredData);
        }
      } catch (error) {
        console.log('Lỗi khi tải danh sách hợp đồng:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedStatus, searchPhrase]);

  const navigateToDetail = (itemId) => {
    navigation.navigate('DetailContractsScreen', { itemId });
  };

  const handleFilterChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Color.colorText} style={styles.loadingContainer} />
      ) : (
        <>
          <ContractsHeader />

          <FilterBar
            listTab={listFilter}
            selectedStatus={selectedStatus}
            onTabPress={handleFilterChange}
          />

          <FlatList
            data={searchPhrase ? filteredContracts : contracts}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigateToDetail(item.id)}>
                <ItemListContracts {...item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            style={{ height: '100%', width: '100%' }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

export default ContractsScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    backgroundColor: Color.neutral4,
  },
  nameScreenAndBtnAdd: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 16,
    marginBottom: 16,
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
    marginLeft: 7,
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: 'flex-start',
  },
  filterBar: {
    marginHorizontal: 1,
    marginTop: 8,
  },
  searchEvent: {
    height: 48,
    paddingVertical: 0,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Padding.p_5xl,
    borderRadius: Border.br_base,
    alignSelf: 'stretch',
    backgroundColor: Color.colorWhite,
    elevation: 10,
    shadowColor: Color.colorBlack,
    shadowOffset: { width: 0, height: 100 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
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
  containerTabBar: {
    width: 313,
    height: 40,
    marginTop: 16,
  },
  tabBar: {
    left: 0,
    top: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabAll: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnTabAll: {
    fontWeight: '500',
    color: Color.neutral2,
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    textAlign: 'left',
  },
  tabBarCompleted: {
    backgroundColor: Color.colorBlueviolet,
    marginLeft: 16,
    borderRadius: Border.br_xs,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnCompleted: {
    textAlign: 'right',
    color: Color.colorWhite,
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    fontWeight: '700',
  },
  tabUncompleted: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  btnUnCompleted: {
    fontWeight: '500',
    color: Color.neutral2,
    lineHeight: 24,
    fontSize: FontSize.headlines16Medium_size,
    textAlign: 'left',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
