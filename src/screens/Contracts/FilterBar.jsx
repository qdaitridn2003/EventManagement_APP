import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

import { Color } from '../../components/styles/GlobalStyles';

const FilterBar = ({ listTab, onTabPress, selectedStatus }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.tabBar}>
        {listTab.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              { height: 60 },
              selectedStatus === tab.status && styles.selectedTab,
            ]}
            onPress={() => onTabPress(tab.status)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedStatus === tab.status ? Color.colorWhite : 'gray' },
              ]}
            >
              {tab.status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    marginTop: 16,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: Color.colorWhite,
    elevation: 5,
    shadowColor: Color.colorBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  selectedTab: {
    backgroundColor: Color.colorBlueviolet,
  },
  tabText: {
    color: Color.colorWhite,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FilterBar;
