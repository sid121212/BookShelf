import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { pallete, themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";

const BookScreen = () => {
  const route = useRoute();
  const { book_id, title, genre, rating, review, imgUrl, lat, long, price } =
    route.params;

  return (
    <View>
      <ScrollView>
        <View className="relative">
          <Image className="w-full h-72" source={{ uri: imgUrl }} />
          <TouchableOpacity
            onPress={() => console.log("go back")}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bg} />
          </TouchableOpacity>
        </View>

        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Image
                  source={require("../assets/images/fullStar.png")}
                  className="h-4 w-4"
                />
                <Text className="text-xs">
                  <Text className="text-green-700">{rating}</Text>
                  <Text className="text-gray-700">
                    ({review} review)  . 
                     <Text className="font-semibold">  {genre}  </Text>
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Icon.MapPin color="gray" width="15" height="15" />
                <Text className="text-gray-700 text-xs">Nearby . {lat}&{long} kms</Text>
              </View>
              
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default BookScreen;
