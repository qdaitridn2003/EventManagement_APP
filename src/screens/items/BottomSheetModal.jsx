import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const BottomSheetModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      swipeDirection="down"
      backdropOpacity={0.5}>
      <View style={styles.container}>
        <View style={styles.bottomSheet}>
          <TouchableOpacity>
            <Text style={styles.select}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.select}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.select}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  select: {
    padding: 5,
    fontSize: 15,
  },
});

export default BottomSheetModal;
