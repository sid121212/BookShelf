import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderDetailScreen = () => {
  return (
    <View>
      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{uri:"https://i.ibb.co/Jv0j3zs/image.jpg"}} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bg} />
          </TouchableOpacity>
        </View>
        <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="bg-white -mt-12 pt-6" View></View>
        
      </ScrollView>
    </View>
  );
};

export default OrderDetailScreen;
