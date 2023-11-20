import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
  </View>
);

const ClientsListItem = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    if (searchPhrase === '') {
      return <Item name={item.name} details={item.details} />;
    }
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))) {
      return <Item name={item.name} details={item.details} />;
    }
    if (item.details.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))) {
      return <Item name={item.name} details={item.details} />;
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}>
        <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id} />
      </View>
    </SafeAreaView>
  );
};

export default ClientsListItem;

const styles = StyleSheet.create({
  list__container: {
    height: '85%',
    width: '100%',
  },
  item: {
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
