import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const DeleteConfirmationModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <AntDesign name="exclamationcircleo" size={50} color="red" />
          
          <Text style={styles.modalText}>Are you sure you want to delete?</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.noButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.yesButton]}
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              <Text style={[styles.buttonText, styles.yesButtonText]}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalText: {
    marginVertical: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '45%',
  },
  noButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  yesButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  yesButtonText: {
    color: 'white',
  },
});

export default DeleteConfirmationModal;