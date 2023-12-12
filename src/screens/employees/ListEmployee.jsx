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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DummyDataEmployee from './DummyDataEmployee';
import { Color } from '../../components/styles/GlobalStyles';
import { AppContext } from '../../contexts';

const Item = ({ name, role, imageSource, id }) => {
  const [isMenu, setIsMenu] = useState(false);
  const navigation = useNavigation();
  const { dataIdEmployee } = useContext(AppContext);
  const [idEmployee, setIdEmployee] = dataIdEmployee;

  const handleClickItem = () => {
    setIdEmployee(id);
    navigation.navigate('DetailEmployeeScreen');
  };
  return (
    <TouchableOpacity onPress={handleClickItem}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Image style={styles.image} source={require('../../assets/avatar-28x2813x.png')} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
          </View>

          <TouchableWithoutFeedback onPress={() => setIsMenu(!isMenu)}>
            <Image source={require('../../assets/icons/MoreVert.png')} />
          </TouchableWithoutFeedback>

          {isMenu && (
            <View style={styles.conainerPopupMenu}>
              <TouchableOpacity>
                <Text style={[styles.textPopupMenu, , styles.textBtnEdit]}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={[styles.textPopupMenu, , styles.textBtnDel]}>Xoá</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListEmployee = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    const employeeData = data.find((employee) => employee.id === item.id);
    const imageSource = employeeData ? employeeData.image : null;

    if (
      searchPhrase === '' ||
      item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, '')) ||
      item.role.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return <Item id={item.id} name={item.name} role={item.role} imageSource={imageSource} />;
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
    borderRadius: 25,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  conainerPopupMenu: {
    position: 'absolute',
    left: 265,
    top: 60,
    width: 70,
    height: 70,
    borderRadius: 10,
  },
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
});

export default ListEmployee;
