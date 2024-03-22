import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderScreen = () => {
  const navigation = useNavigation();
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("credentials"));
        setUser(user);
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_domain}getOrders/${user.user_id}`
        );
        if (response.ok) {
          const data = await response.json();
        //   console.log(data.orders);
          
          setOrderItems(data.orders);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchOrders();
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
          <Text className="text-center font-bold text-xl">Your Orders</Text>
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
        <Text className="flex-1 pl-4">Can't resist tracking your orders !</Text>

        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold", color: "purple", marginRight: 3 }}>Track</Text>
          <Icon.ArrowRightCircle width={15} height={15} stroke={"purple"}/>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="bg-white pt-5"
      >
        {orderItems.map((item, index) => (
          <View
            key={index}
            className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
          >
            {/* <Text className="font-bold" style={{ color: themeColors.bg }}>
              1 x
            </Text> */}
            <Image
              className="h-14 w-14 rounded-full"
              source={require("../assets/images/book1.jpg")}
            />
            <Text className="flex-3 font-bold text-gray-700">
              {item.date_created}
            </Text>
            <Text className="flex-3 font-bold text-gray-700">
              {item.time_created}
            </Text>
            <Text
              style={{
                flex: 1,
                fontWeight: "bold",
                color: item.status ? "green" : "red",
              }}
            >
              {item.status ? "Success" : "Cancelled"}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* dishes */}
    </SafeAreaView>
  );
};

export default OrderScreen;
