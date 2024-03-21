import {
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { pallete, themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import Categories from "../components/Categories";
import Trending from "../components/Trending";
import * as Location from "expo-location";

import ListingAll from "../components/ListingAll";
import CartIcon from "../components/CartIcon";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    
  }, [searchText]);

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const trending = [
    {
      id: "abc",
      title: "All",
    },
  ];

  const handleLocationPress = async () => {
    try {
      // Request permission to access the user's location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission not granted");
      }

      // Get the user's current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Use the latitude and longitude as needed
      console.log("Latitude:", latitude);
      setLatitude(latitude);
      setLongitude(longitude);
      console.log("Longitude:", longitude);
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("Error", "Failed to get location. Please try again.");
    }
  };

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
            style={{ flex: 1, marginLeft: 5, color: "black" }}
            placeholder="Books | Authors"
            keyboardType="default"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
          <TouchableOpacity
            className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-black-300"
            onPress={handleLocationPress}
          >
            <Icon.MapPin height="20" width="20" stroke="black" />
            <Text className="text-black-600">Thane, Ind</Text>
          </TouchableOpacity>
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
          onPress={() => navigation.navigate("Profile")}
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
        <Categories onSearchTextChange={handleSearchTextChange} />

        <View className="mt-5">
          {trending?.map((card, index) => {
            return (
              <ListingAll
                key={index}
                id={card.id}
                title={card.title}
                search={searchText}
                latitude={latitude}
                longitude={longitude}
              />
            );
          })}
        </View>
        <View className="mt-5">
          {trending?.map((card, index) => {
            return <ListingAll key={index} id={card.id} title={card.title} />;
          })}
        </View>
        <View className="mt-5">
          {trending?.map((card, index) => {
            return <ListingAll key={index} id={card.id} title={card.title} />;
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
