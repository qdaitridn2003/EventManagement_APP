import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../common/Icon';
import IconButton from '../common/IconButton';
import { Color } from '../styles/GlobalStyles';

const SubHeaderBar = ({ onBackPress, title, onDeletePress, onEditPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* Title (optional) */}
      {title && <Text style={styles.title}>{title}</Text>}

      {/* Back Button */}
      <TouchableOpacity onPress={onBackPress}>
        <Icon source={require('../../assets/icons/Back.png')} color={Color.neutral1} />
      </TouchableOpacity>

      {/* Right Buttons */}
      <View style={styles.buttonsContainer}>
        {onDeletePress && (
          <IconButton
            onPress={onDeletePress}
            iconSource={require('../../assets/icons/DeleteOutline.png')}
            isSizeSmall={true}
            buttonColor={Color.semanticRed}
          />
        )}
        {onEditPress && (
          <IconButton
            onPress={onEditPress}
            iconSource={require('../../assets/icons/Edit.png')}
            isSizeSmall={true}
            style={{ marginLeft: 8 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Color.neutral4,
    paddingVertical: 16,
    paddingHorizontal: 20,
    position: 'relative',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});

export default SubHeaderBar;
