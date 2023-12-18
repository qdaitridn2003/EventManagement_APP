import React from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { Color } from '../styles/GlobalStyles';

const CustomPopup = ({ visible, title, message, isLoading, onCancel, onConfirm }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <View style={styles.popup}>
          {isLoading && (
            <ActivityIndicator size="48" color={Color.primary} style={styles.isloading} />
          )}

          {!isLoading && (
            <View style={styles.text}>
              <Text style={styles.title}>{title}</Text>

              <Text style={styles.message}>{message}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                  <Text style={styles.buttonText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                  <Text style={styles.buttonText}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  popup: {
    width: 300,
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
  },
  text: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderRadius: 16,
    backgroundColor: Color.neutral2,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    marginLeft: 8,
    padding: 8,
    borderRadius: 16,
    backgroundColor: Color.primary,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default CustomPopup;
