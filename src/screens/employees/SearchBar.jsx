import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Color } from '../../components/styles/GlobalStyles';

const SearchBar = ({ searchPhrase, setSearchPhrase }) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="black" style={{ marginLeft: 10 }} />
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    margin: 5,
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: 15,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
    width: '90%',
    backgroundColor: Color.colorWhitesmoke,
  },
});
