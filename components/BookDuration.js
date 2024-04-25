import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/native";
// import { pallete, themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import { pallete, themeColors } from "../theme/Index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookDuration({ duration, imgUrl, onSelect, isSelected }) {
  
  const [isActive, setIsActive] = useState(false);
  


  const handleIsActive = () => {
    setIsActive(() => !isActive);
    onSelect();

  };

  return (
    <View
      className={`flex-row items-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2`}
    >
      <Image
        className="rounded-3x1"
        style={{ height: 80, width: 80, borderRadius: 40 }}
        source={{ uri: imgUrl }}
      />
      <View className="flex flex-1 space-y-3">
        <View className="pl-3">
          <Text className="text-xl">{duration.days}</Text>
          <Text className="text-gray-700">Something</Text>
        </View>

        <View className="flex-row justify-between pl-3 items-center">
          <Text className="text-gray-700 text-lg font-bold">
            ${duration.rent}
          </Text>
          <Text className="text-red-500 text-md font-bold">
            {duration.savings} off
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleIsActive}
        style={{
          backgroundColor: isActive ? "black" : "#877dfa",
          padding: 12,
          borderRadius: 20,
          
        }}
      >
        <Text className="text-white">{isActive ? "Selected" : "Select"}</Text>
      </TouchableOpacity>
    </View>
  );
}
