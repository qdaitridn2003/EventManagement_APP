import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from '../common/Icon';
import { Color } from '../styles/GlobalStyles';

const EventCard = ({ imageUrl, title, subtitle, overflowIconPress }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Image
            source={{ imageUrl }}
            style={styles.image}
            resizeMode="cover"
            onError={(error) => console.error('Image loading error:', error)}
          />
        </View>
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
            <Icon source={require('../../assets/icons/MoreVert.png')} color={Color.neutral1} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 20,
  },
  container: {
    width: '100%',
    aspectRatio: 1.5,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
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
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Color.neutral1,
  },
  overflowIconContainer: {
    padding: 8,
  },
});

export default EventCard;
