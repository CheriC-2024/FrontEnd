import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  body: string | React.ReactNode;
  confirmButtonText: string;
  onConfirm: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  body,
  confirmButtonText,
  onConfirm,
}) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.body}>
            {typeof body === 'string' ? <Text>{body}</Text> : body}
          </View>
          <TouchableOpacity onPress={onConfirm} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>{confirmButtonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  body: {
    marginBottom: 20,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#F3F3F3',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default CustomModal;
