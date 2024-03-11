import {
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { pallete, themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import Categories from "../components/Categories";
import Trending from "../components/Trending";

import ListingAll from "../components/ListingAll";
import CartIcon from "../components/CartIcon";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {}, []);

  

  // const handleSignout = async () => {
  //   const user = JSON.parse(await AsyncStorage.getItem("credentials"));
  //   const url = `https://d83c-2405-201-5c09-ab2d-b411-865c-a274-a9a0.ngrok-free.app/emptyCart/?user_id=${user.user_id}`;
  //   console.log(url);
  //   fetch(url, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       // if (!response.ok) {
  //       //   throw new Error(`HTTP error! Status: ${response.status}`);
  //       // }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Cart emptied successfully:", data);
  //       AsyncStorage.removeItem("credentials");
  //       navigation.navigate("Welcome");
  //     })
  //     .catch((error) => {
  //       console.error("Error emptying cart:", error);
  //     });
  // };

  const trending = [
    {
      id: "abc",
      title: "All",
    },
    // {
    //   id: "abcd",
    //   title: "All",
    //   rating: 4,
    //   review: 2469,
    //   imgUrl: "../assets/images/ufo.png",
    //   genre: "self-help",
    //   dist: 1.4,
    // },
  ];

  return (
    <SafeAreaView>
      <CartIcon />
      <StatusBar
        barStyle="dark-content"
        // style={{ backgroundColor: `${themeColors.bg}` }}
        backgroundColor={themeColors.bg}
      />
      {/* search bar */}
      <View className="flex-row items-center space-x-2 px-4 pb-2 ">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-black-300">
          <Icon.Search height="25" width="25" stroke="black" />
          <TextInput
            placeholder="Books | Authors"
            className="ml-2 flex-1 text-black-600"
            keyboardType="default"
          />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-black-300">
            <Icon.MapPin height="20" width="20" stroke="black" />
            <Text className="text-black-600">Thane, Ind</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "#877dfa" }}
          className="p-3 rounded-full"
          onPress={() => navigation.navigate("AddBookScreen")}
        >
          <Icon.PlusCircle
            height={20}
            width={20}
            strokeWidth="3"
            stroke="black"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#877dfa" }}
          className="p-3 rounded-full"
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon.User height={20} width={20} strokeWidth="3" stroke="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      >
        <Categories />

        <View className="mt-5">
          {trending?.map((card, index) => {
            return (
              <ListingAll
                key={index}
                id={card.id}
                title={card.title}
                // genre={card.genre}
                // imgUrl={card.imgUrl}
                // review={card.review}
                // rating={card.rating}
                // dist={card.dist}
              />
            );
          })}
        </View>
        <View className="mt-5">
          {trending?.map((card, index) => {
            return (
              <ListingAll
                key={index}
                id={card.id}
                title={card.title}
                // genre={card.genre}
                // imgUrl={card.imgUrl}
                // review={card.review}
                // rating={card.rating}
                // dist={card.dist}
              />
            );
          })}
        </View>
        <View className="mt-5">
          {trending?.map((card, index) => {
            return (
              <ListingAll
                key={index}
                id={card.id}
                title={card.title}
                // genre={card.genre}
                // imgUrl={card.imgUrl}
                // review={card.review}
                // rating={card.rating}
                // dist={card.dist}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 999, // Large enough to make it a circle
    borderWidth: 1,
    borderColor: "gray",
  },
  textInput: {
    marginLeft: 8,
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 2,
    borderLeftColor: "gray",
    paddingLeft: 8,
  },
  locationText: {
    color: "gray",
  },
  slidersButton: {
    backgroundColor: "rgba(251, 146, 60, 1)",
    padding: 12,
    borderRadius: 999, // Large enough to make it a circle
  },
});
