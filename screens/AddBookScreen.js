import React, { useEffect, useState } from "react";
import {
  Text,
  Button,
  TextInput,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import * as ImagePicker from "expo-image-picker";

export default function AddBookScreen() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [reviews, setReviews] = useState("");
  const [ratings, setRatings] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [price, setPrice] = useState("");
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [imageUrl, setImageUrl] = useState(null);


  useEffect(() => {
    const getData = async () => {
      try {
        const user = JSON.parse(await AsyncStorage.getItem("credentials"));
        // console.log(user['user_id']);
        setUserId(user["user_id"]);
      } catch (e) {
        console.error("User session not set:", error.message);
      }
    };
    getData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_domain}addBook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          title: title,
          category_id: category,
          reviews: parseInt(reviews),
          ratings: parseInt(ratings),
          lat: parseInt(latitude),
          long: parseInt(longitude),
          price: parseInt(price),
          img: imageUrl,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Book added successfully:", data);
        navigation.navigate("Dashboard");
        // Reset form fields or navigate to another screen upon successful submission
      } else {
        throw new Error("Error adding book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      // Handle error or show an error message
    }
  };

  const uploadImageToImgBB = async (imagePath) => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imagePath,
        name: "image.jpg",
        type: "image/jpeg",
      });

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.EXPO_PUBLIC_imagebb_apiKey}`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // await saveImageToDb(data.data.url);
        setImageUrl(data.data.url);
        console.log("Image uploaded to ImgBB:", data.data.url);
        // Handle the response from ImgBB as needed
      } else {
        Alert.alert("Failed to upload image to ImgBB. Please try again later.");
      }
    } catch (error) {
      console.error("Error uploading image to ImgBB:", error);
      Alert.alert("Error uploading image to ImgBB. Please try again later.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      // console.log(result.assets[0].uri);
      await uploadImageToImgBB(result.assets[0].uri);
      // setSelectedFile(result);
      // setSelectedImage(result.assets[0].uri); // Set selected image URI
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: themeColors.bg,
            borderRadius: 20,
            padding: 10,
          }}
        >
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            top: 10,
          }}
        >
          Add Book
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 50, // Add padding top to push the content down
          paddingBottom: 150,
        }}
      >
        <TouchableOpacity onPress={pickImage} className="m-4">
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: 250,
                height: 200,
                borderRadius: 20,
                shadowColor: "black",
              }}
            />
          ) : (
            <View
              style={{
                width: 200,
                height: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon.Image
                strokeWidth={1}
                stroke={"black"}
                height={100}
                width={100}
              ></Icon.Image>
            </View>
          )}
        </TouchableOpacity>
        <View
          style={{ shadowColor: themeColors.bg, shadowRadius: 7 }}
          className="m-4 bg-white rounded-3xl shadow-lg"
        >
          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={{
              margin: "auto",
              paddingHorizontal: 10,
              width: 300,
              height: 50,
              borderColor: "gray",
              // borderWidth: 1,
              borderRadius: 20,
              textAlign: "center",
            }}
          />
        </View>
        <View
          style={{ shadowColor: themeColors.bg, shadowRadius: 7 }}
          className="m-4 bg-white rounded-3xl shadow-lg"
        >
          <TextInput
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            style={{
              margin: "auto",
              paddingHorizontal: 10,
              width: 300,
              height: 50,
              borderColor: "gray",
              // borderWidth: 1,
              borderRadius: 20,
              textAlign: "center",
            }}
          />
        </View>
        <View
          style={{ shadowColor: themeColors.bg, shadowRadius: 7 }}
          className="m-4 bg-white rounded-3xl shadow-lg"
        >
          <TextInput
            placeholder="Reviews"
            value={reviews}
            onChangeText={setReviews}
            style={{
              margin: "auto",
              paddingHorizontal: 10,
              width: 300,
              height: 50,
              borderColor: "gray",
              // borderWidth: 1,
              borderRadius: 20,
              textAlign: "center",
            }}
          />
        </View>
        <View
          style={{ shadowColor: themeColors.bg, shadowRadius: 7 }}
          className="m-4 bg-white rounded-3xl shadow-lg"
        >
          <TextInput
            placeholder="Ratings"
            value={ratings}
            onChangeText={setRatings}
            style={{
              margin: "auto",
              paddingHorizontal: 10,
              width: 300,
              height: 50,
              borderColor: "gray",
              // borderWidth: 1,
              borderRadius: 20,
              textAlign: "center",
            }}
          />
        </View>
        <View
          style={{ shadowColor: themeColors.bg, shadowRadius: 7 }}
          className="m-4 bg-white rounded-3xl shadow-lg"
        >
          <TextInput
            placeholder="Latitude"
            value={latitude}
            onChangeText={setLatitude}
            style={{
              margin: "auto",
              paddingHorizontal: 10,
              width: 300,
              height: 50,
              borderColor: "gray",
              // borderWidth: 1,
              borderRadius: 20,
              textAlign: "center",
            }}
          />
        </View>
        <View
          style={{ shadowColor: themeColors.bg, shadowRadius: 7 }}
          className="m-4 bg-white rounded-3xl shadow-lg"
        >
          <TextInput
            placeholder="Longitude"
            value={longitude}
            onChangeText={setLongitude}
            style={{
              margin: "auto",
              paddingHorizontal: 10,
              width: 300,
              height: 50,
              borderColor: "gray",
              // borderWidth: 1,
              borderRadius: 20,
              textAlign: "center",
            }}
          />
        </View>
        <View
          style={{ shadowColor: themeColors.bg, shadowRadius: 7 }}
          className="m-4 bg-white rounded-3xl shadow-lg"
        >
          <TextInput
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            style={{
              margin: "auto",
              paddingHorizontal: 10,
              width: 300,
              height: 50,
              borderColor: "gray",
              // borderWidth: 1,
              borderRadius: 20,
              textAlign: "center",
            }}
          />
        </View>
      </ScrollView>
      {/* <Button title="Submit" onPress={handleSubmit} />
       */}
      <View className="absolute bottom-16 w-full z-50">
        <TouchableOpacity
          onPress={handleSubmit}
          style={{ backgroundColor: "#877dfa" }}
          className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg opacity-95"
        >
          <Text className="flex-1 text-center font-extrabold text-black text-lg">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
