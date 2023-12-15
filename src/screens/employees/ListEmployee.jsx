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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DummyDataEmployee from './DummyDataEmployee';
import { Color } from '../../components/styles/GlobalStyles';
import { AppContext } from '../../contexts';
import CustomButton from '../../components/common/CustomButton';

const Item = ({ id, name, role, imageSource }) => {
  const [isMenu, setIsMenu] = useState(false);
  const navigation = useNavigation();
  const { dataIdEmployee } = useContext(AppContext);
  const [idEmployee, setIdEmployee] = dataIdEmployee;

  const handleClickItem = () => {
    setIdEmployee(id);
    navigation.navigate('DetailEmployeeScreen');
  };
  const handleClickDetail = () => {
    setIsMenu(false);
    handleClickItem();
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

          <TouchableWithoutFeedback onPress={() => setIsMenu(!isMenu)}>
            <Image source={require('../../assets/icons/MoreVert.png')} />
          </TouchableWithoutFeedback>

          {isMenu && (
            <Modal transparent visible={true} animationType="fade">
              <View style={styles.containerModal}>
                <TouchableWithoutFeedback onPress={() => setIsMenu(false)}>
                  <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.backgroundPopup}>
                  <View style={styles.containerButtonPopup}>
                    <CustomButton color={Color.semanticRed} title="Xoá" />
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
      item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, '')) ||
      item.role.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return <Item id={item.id} name={item.name} role={item.role} imageSource={item.image} />;
    }
    return null;
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
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
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
    margin: 20,
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
