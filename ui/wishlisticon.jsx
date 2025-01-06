import React, { useState } from "react";
import { TouchableOpacity, View, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const WishlistButton = ({ initialState = false, onToggle, style,onSelect }) => {
  const [isWishlisted, setIsWishlisted] = useState(initialState);
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setIsWishlisted(!isWishlisted);
    if (onToggle) {
      onToggle(!isWishlisted);
    }
  };

  return (
    <View className="items-center justify-center" style={style}>
      <Animated.View
        style={{
          transform: [{ scale: scaleValue }],
        }}
      >
        <TouchableOpacity
          onPress={onSelect}
          className={`p-3 rounded-full ${
            isWishlisted 
              ? "bg-white" 
              : "bg-gray-800"
          }`}
          style={{
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        >
          <MaterialCommunityIcons
            name={isWishlisted ? "bookmark" : "bookmark-outline"}
            size={30}
            color={isWishlisted ? '#dc2626' : '#ffffff'}
            style={{ transform: [{ scaleX: 1.2 }] }}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default WishlistButton;