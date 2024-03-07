import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { pallete, themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";

const BookCard = ({title,genre,rating,review,imgUrl,lat,long,price}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.navigate('BookScreen')}>
      <View
        style={{ shadowColor: themeColors.bg, shadowRadius: 7 }}
        className="mr-6 bg-white rounded-3xl shadow-lg"
      >
        <Image
          className="h-36 w-64 rounded-t-3xl"
          source={{uri:imgUrl}}
        />

        <View className="px-3 pb-4 space-y-2">
          <Text className="text-lg font-bold pt-2">{title}</Text>
          <View className="flex-row items-center space-x-1">
            <Image
              source={require("../assets/images/fullStar.png")}
              className="h-4 w-4"
            />
            <Text className="text-xs">
              <Text className="text-green-700">{rating}</Text>
              <Text className="text-gray-700"> ({review} review)</Text> ·{" "}
              <Text className="font-semibold text-gray-700">{genre}</Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin color="gray" width={15} height={15} />
            <Text className="text-gray-700 text-xs"> {lat} & {long}</Text>
          </View>
          <View className="flex-row items-center space-x-1">
            {/* <Icon.MapPin color="gray" width={15} height={15} /> */}
            <Text className="text-gray-700 text-xs"> {price} $</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
