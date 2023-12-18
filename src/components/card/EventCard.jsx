import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../common/Icon';
import { Color } from '../styles/GlobalStyles';
import { ImageBackground } from 'expo-image';

const EventCard = ({ imageUrl, title, subtitle, overflowIconPress, style, onPress }) => {
  const source = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;

  return (
    <View style={style}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <ImageBackground
          style={styles.top}
          source={source}
          onError={(error) => console.error('Image loading error:', error)}
        >
          {/* Status on bottom left */}
          {/* Avatar row on bottom right */}
        </ImageBackground>

        <View style={styles.bottom}>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.subtitle}>
              {subtitle}
            </Text>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {title}
            </Text>
          </View>

          <TouchableOpacity onPress={overflowIconPress} style={styles.overflowIconContainer}>
            <Icon source={require('../../assets/icons/MoreVert.png')} color={Color.neutral2} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {},
  container: {
    width: '100%',
    aspectRatio: 1.5,
    overflow: 'hidden',
    elevation: 3,
    borderRadius: 16,
  },
  top: {
    flex: 3,
    backgroundColor: Color.neutral3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  subtitle: {
    fontSize: 14,
    color: Color.neutral2,
    marginBottom: 4,
    // backgroundColor: 'green',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.neutral1,
    // backgroundColor: 'violet',
  },
  overflowIconContainer: {
    // backgroundColor: 'cyan',
  },
});

export default EventCard;
