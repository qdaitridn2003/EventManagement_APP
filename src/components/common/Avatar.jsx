import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';

const Avatar = ({ source, showStroke, size }) => {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: showStroke ? 2 : 0,
    borderColor: 'white',
  };

  return (
    <View style={[styles.avatarContainer, avatarStyle]}>
      {typeof source === 'string' ? (
        <Image source={{ uri: source }} style={styles.avatarImage} />
      ) : (
        <Image source={source} style={styles.avatarImage} />
      )}
    </View>
  );
};

Avatar.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]).isRequired,
  showStroke: PropTypes.bool,
  size: PropTypes.number.isRequired,
};

Avatar.defaultProps = {
  showStroke: false,
};

const styles = StyleSheet.create({
  avatarContainer: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  avatarImage: {
    flex: 1,
    width: null,
    height: null,
  },
});

export default Avatar;
