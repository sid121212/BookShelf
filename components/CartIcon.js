import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { pallete, themeColors } from "../theme/Index";
import { useNavigation } from "@react-navigation/native";




export default function CartIcon({cartSummary,reloadDashboard}) {
    const navigation = useNavigation();
    
  return (
    <View className="absolute bottom-16 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart', { reloadDashboard })}
        style={{ backgroundColor: "#877dfa" }}
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg opacity-95"
      >
        <View
          className="p-2 px-4 rounded-full"
          style={{ backgroundColor: 'yellow' }}
        >
          <Text className="font-extrabold text-black text-lg">{cartSummary.total_items}</Text>
        </View>
        <Text className="flex-1 text-center font-extrabold text-black text-lg">
          View Cart
        </Text>
        <Text className="font-extrabold text-white text-lg">${cartSummary.total_price}</Text>
      </TouchableOpacity>
    </View>
  );
}
