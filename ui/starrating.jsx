import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const StarRating = ({ rating, size = 24, filledColor = "#FFD700", unfilledColor = "#D3D3D3" }) => {
  const totalStars = 5;
  
  return (
    <View style={styles.container}>
      {[...Array(totalStars)].map((_, index) => (
        <AntDesign
          key={index}
          name="star"
          size={size}
          color={index < rating ? filledColor : unfilledColor}
          style={styles.star}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  }
});

export default StarRating;