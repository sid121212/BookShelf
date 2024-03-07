import React, { useState } from "react";
import { Button, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function AddBookScreen() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [reviews, setReviews] = useState("");
  const [ratings, setRatings] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [price, setPrice] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://f983-2405-201-5c09-ab2d-38dd-ec14-10b8-fa69.ngrok-free.app/addBook",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            category_id: category,
            reviews: parseInt(reviews),
            ratings: parseInt(ratings),
            lat: parseInt(latitude),
            long: parseInt(longitude),
            price: parseInt(price),
            img: 'https://i.ibb.co/d6nMPcm/pexels-pixabay-159872.jpg',
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Book added successfully:", data);
        navigation.navigate('Dashboard');
        // Reset form fields or navigate to another screen upon successful submission
      } else {
        throw new Error("Error adding book");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      // Handle error or show an error message
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          marginBottom: 10,
          paddingHorizontal: 10,
          width: 300,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={{
          marginBottom: 10,
          paddingHorizontal: 10,
          width: 300,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
      />
      <TextInput
        placeholder="Reviews"
        value={reviews}
        onChangeText={setReviews}
        style={{
          marginBottom: 10,
          paddingHorizontal: 10,
          width: 300,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
      />
      <TextInput
        placeholder="Ratings"
        value={ratings}
        onChangeText={setRatings}
        style={{
          marginBottom: 10,
          paddingHorizontal: 10,
          width: 300,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
      />
      <TextInput
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        style={{
          marginBottom: 10,
          paddingHorizontal: 10,
          width: 300,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
      />
      <TextInput
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        style={{
          marginBottom: 10,
          paddingHorizontal: 10,
          width: 300,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={{
          marginBottom: 10,
          paddingHorizontal: 10,
          width: 300,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}
