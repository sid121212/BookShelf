import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
// import { featured } from "../constants";
import { themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CartScreen() {
  //   const restaurant = featured.restaurants[0];
  const navigation = useNavigation();

  const [cartItems, setcartItems] = useState([]);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("credentials"));
        const response = await fetch(
          `https://d83c-2405-201-5c09-ab2d-b411-865c-a274-a9a0.ngrok-free.app/getCart/${user.user_id}`
        );
        if (response.ok) {
          const data = await response.json();

          const arr = [];
          data.cart.map((cartItem) => {
            const temp = JSON.parse(cartItem);
            arr.push(temp);
          });
          // console.log(arr);
          setcartItems(arr);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <SafeAreaView className=" bg-white flex-1">
      {/* back button */}
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: themeColors.bg }}
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
        >
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Your cart</Text>
          <Text className="text-center ☐text-gray-500">Some Book</Text>
        </View>
      </View>
      <View
        style={{ backgroundColor: "#d0d0f5" }}
        className="flex-row px-4 py-4 items-center"
      >
        <Image
          source={require("../assets/images/ufo.png")}
          className="w-12 h-12 "
        ></Image>
        <Text className="flex-1 pl-4">Deliver in 4-5 hours</Text>
        <TouchableOpacity>
          <Text className="font-bold" style={{ color: "purple" }}>
            Change
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="bg-white pt-5"
      >
        {cartItems.map((item, index) => (
          <View
            key={index}
            className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
          >
            <Text className="font-bold" style={{ color: themeColors.bg }}>
              1 x
            </Text>
            <Image
              className="h-14 w-14 rounded-full"
              source={require("../assets/images/book1.jpg")}
            />
            <Text className="flex-1 font-bold text-gray-700">{item.title}</Text>
            <Text className="font-semibold text-base">${item.price}</Text>
            <TouchableOpacity
              className="p-1 rounded-full"
              style={{ backgroundColor: themeColors.bg }}
            >
              <Icon.Minus
                strokeWidth={2}
                height={20}
                width={20}
                stroke="white"
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View
        className="p-6 px-8 rounded-t-3xl space-y-4"
        style={{ backgroundColor: "#d0d0f5" }}
      >
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Item</Text>
          <Text className="text-gray-700">$199</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery</Text>
          <Text className="text-gray-700">$1</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700 font-extrabold">Subtotal</Text>
          <Text className="text-gray-700 font-extrabold">$200</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bg }}
            className="p-3 rounded-full"
          >
            <Text className="text-white text-center font-bold text-lg">
              Rent Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* dishes */}
    </SafeAreaView>
  );
}
