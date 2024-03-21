import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import BookCard from "./BookCard";

const ListingAll = ({ id, title, search, latitude, longitude }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Call the API and retrieve data
    console.log(search);
    fetch(`${process.env.EXPO_PUBLIC_domain}allBooks`)
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved books data to state
        // console.log(data.books[0]._id);
        setBooks(data.books);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const filteredBooks = !search
    ? books
    : books.filter(
        (book) =>
          (book.title &&
            search &&
            book.title.toLowerCase().includes(search.toLowerCase())) ||
          (book.category &&
            search &&
            book.category.toLowerCase().includes(search.toLowerCase()))
      );

  // Sort filtered books based on distance
  const sortedBooks = filteredBooks
    ? filteredBooks.sort((a, b) => {
        const distanceA = calculateDistance(latitude, longitude, a.lat, a.long);
        const distanceB = calculateDistance(latitude, longitude, b.lat, b.long);
        // console.log(distanceA - distanceB)
        return distanceA - distanceB;
      })
    : [];

  function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }
    return chunkedArray;
  }

  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{title} </Text>
          <Text className="text-gray-500 text-xs">today</Text>
        </View>

        <TouchableOpacity>
          <Text
            style={{ color: themeColors.bg }}
            className="font-semibold underline"
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {chunkArray(filteredBooks, 2).map((row, rowIndex) => (
        <ScrollView
          key={rowIndex} // Key for React elements
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          className="overflow-visible py-5"
        >
          {row.map((book, index) => (
            <BookCard
              key={index} // Key for React elements
              book_id={book._id} // Assuming each book has a unique id
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
      ))}
    </View>
  );
};

export default ListingAll;
