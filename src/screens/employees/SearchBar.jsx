import { Feather, Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import { Color } from '../../components/styles/GlobalStyles';

export const SearchBar = ({ searchPhrase, setSearchPhrase }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="black" style={{ marginLeft: 10 }} />
        <TextInput
          onFocus={() => setClicked(true)}
          style={styles.input}
          placeholder="Tìm kiếm..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1, backgroundColor: '#d9dbda', borderRadius: 40 }}
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        )}
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
    marginBottom: 10,
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    elevation: 4,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 16,
    marginHorizontal: 20,
    width: '70%',
  },
});
