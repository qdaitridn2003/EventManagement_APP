import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DummyDataEmployee from './DummyDataEmployee';
import { Color } from '../../components/styles/GlobalStyles';
import { AppContext } from '../../contexts';
import CustomButton from '../../components/common/CustomButton';
import { getAccessToken } from '../../configs/utils/getAccessToken';
import { axiosAuthDel } from '../../configs/axiosInstance';
import Icon from '../../components/common/Icon';

const Item = ({ id, name, role, imageSource, authId }) => {
  const navigation = useNavigation();
  const { checkData } = useContext(AppContext);
  const [dataChange, setDataChange] = checkData;
  const [isMenu, setIsMenu] = useState(false);
  const { dataIdEmployee } = useContext(AppContext);
  const [idEmployee, setIdEmployee] = dataIdEmployee;
  const [isModalDeleteIndicator, setIsModalDeleteIndicator] = useState(false);

  const handleClickItem = () => {
    setIdEmployee(id);
    navigation.navigate('DetailEmployeeScreen');
  };
  const handleClickDetail = () => {
    setIsMenu(false);
    handleClickItem();
  };
  const handleClickDelete = async () => {
    setIsModalDeleteIndicator(true);
    const accessToken = await getAccessToken();
    const respone = await axiosAuthDel(`/employee/delete-employee/${id}`, accessToken);
    const responeAcount = await axiosAuthDel(`/auth/delete-account/${authId}`, accessToken);
    setDataChange((prev) => prev + 1);
    setIsMenu(false);
  };
  return (
    <TouchableWithoutFeedback onPress={handleClickItem}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source={
              imageSource ? { uri: imageSource } : require('../../assets/icons/AddAvatar.jpeg')
            }
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text>{role}</Text>
          </View>

          <TouchableOpacity onPress={() => setIsMenu(!isMenu)}>
            <Icon source={require('../../assets/icons/MoreVert.png')} color={Color.neutral2} />
          </TouchableOpacity>

          {isMenu && (
            <Modal transparent visible={true} animationType="fade">
              <View style={styles.containerModal}>
                <TouchableWithoutFeedback onPress={() => setIsMenu(false)}>
                  <View style={styles.background}>
                    {isModalDeleteIndicator ? <ActivityIndicator size={'large'} /> : null}
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.backgroundPopup}>
                  <View style={styles.containerButtonPopup}>
                    <CustomButton
                      color={Color.semanticRed}
                      onPress={handleClickDelete}
                      title="Xoá"
                    />
                    <CustomButton title="Thông tin chi tiết" onPress={handleClickDetail} />
                    <TouchableOpacity style={styles.buttonCancel} onPress={() => setIsMenu(false)}>
                      <Text style={styles.textCancel}>Huỷ</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ListEmployee = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    if (
      searchPhrase === '' ||
      item.fullName.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, '')) ||
      item.auth.role.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <Item
          id={item._id}
          name={item.fullName}
          role={item.auth.role.name}
          imageSource={item.avatar}
          authId={item.auth.id}
        />
      );
    }
    return null;
  };
  const { loadingFooter, pagination, checkData } = useContext(AppContext);
  const [isLoading, setIsLoading] = loadingFooter;
  const [pageData, setPageData] = pagination;
  const [dataChange, setDataChange] = checkData;

  const renderLoader = () => {
    return isLoading ? (
      <View style={{ marginTop: 10, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };
  const loadMoreItem = () => {
    setPageData(pageData + 1);
    setDataChange((prev) => prev + 1);
    console.log('Load more Item');
  };
  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreItem}
          ListFooterComponent={renderLoader}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list__container: {
    height: '85%',
    width: '100%',
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4,
    marginVertical: 16,
    marginHorizontal: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  textContainer: {
    flex: 1,
    padding: 22,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  conainerPopupMenu: {},
  textPopupMenu: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  textBtnEdit: {
    borderBottomWidth: 1,
    backgroundColor: Color.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textBtnDel: {
    backgroundColor: Color.semanticRed,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  containerModal: {
    flex: 1,
    width: '100%',

    flexDirection: 'column',
    backgroundColor: '#000000aa',
  },

  backgroundPopup: {
    backgroundColor: '#fff',
    height: '30%',
    marginHorizontal: 10,
    borderTopLeftRadius: 20,
    elevation: 10,
    borderTopRightRadius: 20,
  },
  background: {
    backgroundColor: 'transparent',
    height: '70%',
    justifyContent: 'center',
  },
  containerButtonPopup: {
    paddingHorizontal: 10,
  },
  buttonCancel: {
    marginTop: 20,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCancel: {
    color: 'black',
    fontSize: 16,
  },
});

export default ListEmployee;
