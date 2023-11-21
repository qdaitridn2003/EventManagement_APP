import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image } from 'react-native';

import DummyDataEmployee from './DummyDataEmployee';

const Item = ({ name, details, imageSource }) => (
  <View style={styles.item}>
    <Image style={styles.image} source={imageSource} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
  </View>
);

const ListEmployee = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    const employeeData = DummyDataEmployee.find(employee => employee.id === item.id);
    const imageSource = employeeData ? employeeData.image : null;

    if (
      searchPhrase === '' ||
      item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, '')) ||
      item.details.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return <Item name={item.name} details={item.details} imageSource={imageSource} />;
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListEmployee;

const styles = StyleSheet.create({
  list__container: {
    height: '85%',
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    padding: 8,
  },
  textContainer: {
    marginLeft: 10,
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
});
