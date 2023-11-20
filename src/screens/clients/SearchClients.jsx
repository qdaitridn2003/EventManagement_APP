import { Feather, Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View, Keyboard, Button } from 'react-native';

const SearchClients = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.container}>
      <View style={clicked ? styles.searchClients__clicked : styles.searchClients__unclicked}>
        <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm khách hàng"
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
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        )}
      </View>
      {clicked && (
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
      )}
    </View>
  );
};
export default SearchClients;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
  },
  searchClients__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchClients__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 16,
    marginLeft: 10,
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
