import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Color } from '../styles/GlobalStyles';

const AvatarRow = ({
  avatars,
  showBorder,
  borderColor,
  borderThickness,
  avatarSize,
  overlap,
  maxAvatars,
}) => {
  const containerStyle = {
    flexDirection: 'row',
    overflow: 'visible',
  };

  const avatarContainerStyle = {
    backgroundColor: Color.neutral4,
    width: avatarSize + borderThickness * 2,
    height: avatarSize + borderThickness * 2,
    borderRadius: avatarSize,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: overlap ? -avatarSize / 3 : 0,
    marginRight: 0,
  };

  const placeholderStyle = {
    ...avatarContainerStyle,
    borderWidth: borderThickness,
    borderColor: Color.neutral4,
    backgroundColor: Color.secondary,
  };

  return (
    <View style={{ ...containerStyle }}>
      {avatars.slice(0, maxAvatars).map((avatar, index) => (
        <View key={index} style={{ ...avatarContainerStyle }}>
          <Avatar.Image source={{ uri: avatar }} size={avatarSize} />
        </View>
      ))}
      {avatars.length > maxAvatars && (
        <View style={{ ...placeholderStyle }}>
          <Text style={{ color: Color.neutral4, fontSize: avatarSize / 3, fontWeight: 'bold' }}>
            +{avatars.length - maxAvatars}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AvatarRow;
