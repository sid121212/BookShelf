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
import BookDuration from "../components/BookDuration";

import CartIcon from "../components/CartIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookScreen = () => {
  const route = useRoute();
  const { book_id, title, genre, rating, review, imgUrl, lat, long, price } =
    route.params;

  const duration = [
    {
      days: "1 week",
      rent: 50,
      savings: "10%",
    },
    {
      days: "15 days",
      rent: 70,
      savings: "20%",
    },
    {
      days: "1 month",
      rent: 110,
      savings: "40%",
    },
    {
      days: "3 months",
      rent: 150,
      savings: "60%",
    },
  ];

  const [selectedDurationIndex, setSelectedDurationIndex] = useState(null);

  const handleSelectDuration = (index) => {
    console.log(index);
    setSelectedDurationIndex(index);
  };

  

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
                    ({review} review) .
                    <Text className="font-semibold"> {genre} </Text>
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Icon.MapPin color="gray" width="15" height="15" />
                <Text className="text-gray-700 text-xs">
                  Nearby . {lat}&{long} kms
                </Text>
              </View>
            </View>
          </View>

          <View className="pb-36 bg-white">
            <Text className="px-4 py-4 text-2xl font-bold">Select</Text>
            {duration.map((time, index) => (
              <BookDuration
                key={index}
                duration={time}
                imgUrl={imgUrl}
                onSelect={() => handleSelectDuration(index)}
                isSelected={index === selectedDurationIndex}
              />
            ))}
          </View>
          {selectedDurationIndex !== null && (
            <View>
              <Text>Selected Duration: {selectedDurationIndex}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default BookScreen;
