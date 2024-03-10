import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
// import { pallete, themeColors } from "../theme/Index";
import * as Icon from "react-native-feather";
import { pallete, themeColors } from "../theme/Index";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookCard = ({
  book_id,
  title,
  genre,
  rating,
  review,
  imgUrl,
  lat,
  long,
  price,
}) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(await AsyncStorage.getItem("credentials"));
      // console.log(user)
      setUser(user);
    };
    
    const fetchCart = async () => {
      try{
        // const user = JSON.parse(await AsyncStorage.getItem("credentials"));
        const response = await fetch(`https://d83c-2405-201-5c09-ab2d-b411-865c-a274-a9a0.ngrok-free.app/checkCartItemInCart?user_id=${user.user_id}&object_id=${book_id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Response:", data.inCart);
          
          // Check if the item is in the cart based on the response
          if (data.inCart) {
            setIsAddedToCart(true); // Assuming setIsAddedToCart is a state setter function
          }
        } else {
          throw new Error("Failed to fetch cart item status");
        }
      }catch(e){
        console.log(e);
      };
    };
    
    
    fetchUser();
    fetchCart();
  }, [isAddedToCart]);

  const navigation = useNavigation();

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = async () => {
    if (!isAddedToCart) {
      try {
        const response = await fetch('https://d83c-2405-201-5c09-ab2d-b411-865c-a274-a9a0.ngrok-free.app/addCart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: user.user_id,
            object_id: book_id
          })
        });
    
        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
    
        const data = await response.json();
        console.log('Item added to cart:', data);
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }else {
      try {
        const response = await fetch(`https://d83c-2405-201-5c09-ab2d-b411-865c-a274-a9a0.ngrok-free.app/deleteCart?user_id=${user.user_id}&object_id=${book_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log("Item deleted successfully:", data);
        } else {
          throw new Error('Failed to delete item from cart');
        }
      } catch (error) {
        console.error('Error deleting item from cart:', error);
      }
    }
    setIsAddedToCart(!isAddedToCart);
  };
  return (
    <TouchableOpacity onPress={() => navigation.navigate("BookScreen")}>
      <View
        style={{ shadowColor: themeColors.bg, shadowRadius: 7 }}
        className="mr-6 bg-white rounded-3xl shadow-lg"
      >
        <Image className="h-36 w-64 rounded-t-3xl" source={{ uri: imgUrl }} />

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
            <Text className="text-gray-700 text-xs">
              {" "}
              {lat} & {long}
            </Text>
          </View>
          <View className="flex-row justify-between pl-3 items-center">
            <View className="flex-row items-center space-x-1">
              {/* <Icon.MapPin color="gray" width={15} height={15} /> */}
              <Text className="text-gray-700 text-xs"> {price} $</Text>
            </View>
            <View className="flex-row items-center">
              {/* <TouchableOpacity
                className="p-1 rounded-full"
                style={{  backgroundColor: 'yellow' }}
                
              >
                <Icon.Minus
                  strokeWidth={3}
                  height={20}
                  width={20}
                  stroke={"black"}
                  
                />
              </TouchableOpacity>
              <Text className="px-3">{2}</Text>
              <TouchableOpacity
                className="p-1 rounded-full"
                style={{ backgroundColor:'yellow' }}
              >
                <Icon.Plus
                  strokeWidth={3}
                  height={20}
                  width={20}
                  stroke={"black"}
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={handleAddToCart}
                style={{
                  backgroundColor: isAddedToCart ? "red" : "#877dfa", // Change the button color
                  // padding: 10,
                  // borderRadius: 5,
                  // alignItems: "center",
                }}
                className="p-3 rounded-full"
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14, // Adjust the text size
                  }}
                >
                  {isAddedToCart ? "Remove" : "Add to Cart"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
