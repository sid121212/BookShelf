import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import BookCard from "./BookCard";

const Trending = ({ id, title }) => {



  // useEffect(() => {
  //   // Call the API and retrieve data
  //   fetch("https://f983-2405-201-5c09-ab2d-38dd-ec14-10b8-fa69.ngrok-free.app/allBooks")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Set the retrieved books data to state
  //       console.log(data)
  //       setBooks(data);
  //     })
  //     .catch((error) => console.error("Error fetching books:", error));
  // }, []);

  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{title} </Text>
          <Text className="text-gray-500 text-xs">today</Text>
        </View>

        <TouchableOpacity>
          <Text style={{ color: themeColors.bg }} className="font-semibold">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="overflow-visible py-5"
      >
        {books.map((book) => (
          <BookCard
            key={book.id} // Assuming each book has a unique id
            id={book.id}
            title={book.title}
            genre={book.genre}
            imgUrl={book.imgUrl}
            review={book.review}
            rating={book.rating}
            dist={book.dist}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Trending;
