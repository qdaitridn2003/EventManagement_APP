import { StyleSheet, Text, View, ActivityIndicator, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';

const CustomIndicator = ({ size, color, backgroundModalColor, ...props }) => {
  const [isModalIndicatorVisible, setIsModalIndicatorVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsModalIndicatorVisible(false);
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={isModalIndicatorVisible} animationType="fade">
        <View
          style={[
            styles.backgroundModal,
            backgroundModalColor
              ? { backgroundColor: backgroundModalColor }
              : { backgroundColor: '#000000aa' },
          ]}
        >
          <View style={styles.backgroundIndicator}>
            <ActivityIndicator size={size} color={color} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomIndicator;

const styles = StyleSheet.create({
  backgroundModal: {
    flex: 1,
  },
  backgroundIndicator: {
    marginTop: '80%',
    marginHorizontal: 140,
    padding: 24,
    borderRadius: 20,
    height: 90,
  },
});
