import { Feather, Entypo } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import { Color } from '../../components/styles/GlobalStyles';

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.container}>
      <View style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>
        <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm nhân viên"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
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
      {/* {clicked && (
        <View>
          <Button
            style={styles.buttonText}
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          />
        </View>
      )} */}
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    margin: 5,
    marginBottom: 10,
  },
  searchBar__unclicked: {
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
    marginLeft: 20,
    width: '90%',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
