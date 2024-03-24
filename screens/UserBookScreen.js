import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
// import { featured } from "../constants";
import { themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserBookScreen = () => {
  const navigation = useNavigation();
  const [user,setUser] = useState(null);
  const [books,setBooks] = useState()
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("credentials"));
        setUser(user);
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_domain}userBooks/${user.user_id}`
        );
        if (response.ok) {
          const data = await response.json();

          setBooks(data.books);
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
          <Text className="text-center font-bold text-xl">Your Books</Text>
          <Text className="text-center ☐text-gray-500">On Rent</Text>
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
        <Text className="flex-1 pl-4">Get your rented books again ?</Text>
        <TouchableOpacity>
          <Text className="font-bold" style={{ color: "purple" }}>
            Unrent
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="bg-white pt-5"
      >
        {books && books.map((item, index) => (
          
          <View
            key={index}
            className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
          >
            <Text className="font-bold" style={{ color: themeColors.bg }}>
              1 x
            </Text>
            <Image
              className="h-14 w-14 rounded-full"
              source={{uri: item.img}}
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

      {/* dishes */}
    </SafeAreaView>
  );
};

export default UserBookScreen;
