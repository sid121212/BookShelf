import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import BookCard from "./BookCard";

const ListingAll = ({ id, title }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Call the API and retrieve data
    fetch(
      "https://d83c-2405-201-5c09-ab2d-b411-865c-a274-a9a0.ngrok-free.app/allBooks"
    )
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved books data to state
        console.log(data);
        setBooks(data.books);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{title} </Text>
          <Text className="text-gray-500 text-xs">today</Text>
        </View>

        <TouchableOpacity>
          <Text style={{ color: themeColors.bg }} className="font-semibold underline">
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
        {books.map((book,index) => (
          <BookCard
            key={index} // Assuming each book has a unique id
            title={book.title}
            genre={book.category}
            imgUrl={book.img}
            review={book.reviews}
            rating={book.ratings}
            lat={book.latitude}
            long={book.longitude}
            price={book.price}

          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ListingAll;
