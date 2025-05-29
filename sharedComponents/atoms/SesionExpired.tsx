import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface SessionExpiredModalProps {
  visible: boolean;
  onLoginPress: () => void;
}

const SesionExpired: React.FC<SessionExpiredModalProps> = ({ visible, onLoginPress }) => {
  return (
    <Modal isVisible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Session Expired</Text>
          <Text style={styles.message}>Please login again to continue.</Text>
          <TouchableOpacity style={styles.button} onPress={onLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  message: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});

export default SesionExpired;
