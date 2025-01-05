import React from 'react';
import { View, Text, TouchableOpacity, Share, Modal, Animated, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const ShareEventWithFriend = ({ visible, onClose, event = { title: "Amazing Event", date: "2024-01-20", venue: "Crystal Hall" } }) => {
  const shareOptions = [
    { 
      icon: <MaterialCommunityIcons name="whatsapp" size={30} color="white" />, 
      label: "WhatsApp", 
      backgroundColor: '#25D366' 
    },
    { 
      icon: <MaterialIcons name="message" size={30} color="white" />, 
      label: "Message", 
      backgroundColor: '#007AFF' 
    },
    { 
      icon: <MaterialIcons name="email" size={30} color="white" />, 
      label: "Email", 
      backgroundColor: '#EA4335' 
    },
    { 
      icon: <MaterialIcons name="content-copy" size={30} color="white" />, 
      label: "Copy Link", 
      backgroundColor: '#6B7280' 
    },
  ];

  const handleShare = async () => {
    try {
      const message = `Check out this event: ${event.title} on ${event.date} at ${event.venue}!`;
      await Share.share({
        message,
        title: event.title,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.bottomSheet}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Share Event</Text>
            <Text style={styles.subtitle}>{event.title}</Text>
          </View>

          {/* Share options grid */}
          <View style={styles.optionsGrid}>
            {shareOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleShare(option.label)}
              >
                <View style={[styles.iconContainer, { backgroundColor: option.backgroundColor }]}>
                  {option.icon}
                </View>
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Main share button */}
          <TouchableOpacity
            style={styles.mainShareButton}
            onPress={() => handleShare('default')}
          >
            <MaterialCommunityIcons name="share-variant" size={24} color="white" />
            <Text style={styles.shareButtonText}>Share Now</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 30,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  optionButton: {
    alignItems: 'center',
    width: Dimensions.get('window').width / 4 - 20,
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionLabel: {
    fontSize: 12,
    color: '#4B5563',
    textAlign: 'center',
  },
  mainShareButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ShareEventWithFriend;