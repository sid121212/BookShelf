import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
// import { featured } from "../constants";
import { themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function CartScreen({ navigation, route }) {
  const { reloadDashboard } = route.params;
  //   const restaurant = featured.restaurants[0];
  // const navigation = useNavigation();
  const [cartUpdated, setCartUpdated] = useState(false);
  const [cartItems, setcartItems] = useState([]);
  const [price, setprice] = useState(0);
  const [deliveryPrice, setdeliveryPrice] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("credentials"));
        setUser(user);
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_domain}getCart/${user.user_id}`
        );
        if (response.ok) {
          const data = await response.json();

          const arr = [];
          data.cart.map((cartItem) => {
            const temp = JSON.parse(cartItem);
            setprice(price + temp.price);
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
  }, [cartUpdated]);

  const handleRemoveFromCart = async (book_id) => {
    // console.log(book_id);
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_domain}deleteCart?user_id=${user.user_id}&object_id=${book_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCartUpdated((prev) => !prev);
        reloadDashboard();
        console.log("Item deleted successfully:", data);
      } else {
        throw new Error("Failed to delete item from cart");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

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
              onPress={() => handleRemoveFromCart(item._id)}
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
          <Text className="text-gray-700">${price}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery</Text>
          <Text className="text-gray-700">${deliveryPrice}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700 font-extrabold">Subtotal</Text>
          <Text className="text-gray-700 font-extrabold">
            ${price + deliveryPrice}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bg }}
            className="p-3 rounded-full"
            onPress={() => navigation.navigate("Payment")}
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
