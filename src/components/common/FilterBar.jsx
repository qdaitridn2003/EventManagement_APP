import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import IconTextButton from './IconTextButton';
import { Color } from '../styles/GlobalStyles';

const FilterBar = ({ listTab, style }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (listTab.length > 0) {
      setStatus(listTab[0].status);
    }
  }, [listTab]);

  const setStatusFilter = (selectedStatus) => {
    setStatus(selectedStatus);
    // You can perform additional actions based on the selected status here
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
      >
        {listTab.map((tab, index) => (
          <IconTextButton
            isSmall
            showShadow
            key={index}
            onPress={() => setStatusFilter(tab.status)}
            label={tab.status}
            textColor={
              status === tab.status ? Color.neutral4 : Color.neutral1
            }
            buttonColor={
              status === tab.status ? Color.primary : Color.neutral4
            }
            style={styles.button}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  filterBar: {
    flexDirection: 'row',
  },
  button: {
    margin: 4,
  },
});

export default FilterBar;