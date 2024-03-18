import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";

const Categories = ({ onSearchTextChange }) => {
    const [activeCategory, setActiveCategory] = useState(false);
    const handleCategorySelect = (category) => {
      onSearchTextChange(category);
    };
  return (
    <View className="mt-4">
      <ScrollView
        // className="p-4"
        horizontal
        showsHorizontalScrollIndicator={false}
        className="overflow-visible"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {/* {
          categories?.map(category=>{
            let isActive = category._id==activeCategory;
            let btnClass = isActive? ' bg-gray-600': ' bg-gray-200';
            let textClass = isActive? ' font-semibold text-gray-800': ' text-gray-500';
            return(
              <View key={category._id} className="flex justify-center items-center mr-6">
                <TouchableOpacity 
                  onPress={()=> setActiveCategory(category._id)} 
                  className={"p-1 rounded-full shadow"+ btnClass}>
                  <Image style={{width: 45, height: 45}} source={{
                      uri: urlFor(category.image).url(),
                  }} 
                  />
                </TouchableOpacity>
                <Text className={"text-sm "+textClass}>{category.name}</Text>
              </View> 
            )
          })
        } */}

        <View
          className="flex justify-center items-center mr-6"
        >
          <TouchableOpacity
            // onPress={() => setActiveCategory(true)}
            onPress={() => handleCategorySelect("Fiction")}
            className="p-2 rounded-full shadow bg-[#d0d0f5] border" 
          >
            <Image
              style={{ width: 45, height: 45 }}
              source={require("../assets/images/ufo.png")}
            />
          </TouchableOpacity>
          <Text className="text-sm text-gray-500">Fiction</Text>
        </View>
        <View
          className="flex justify-center items-center mr-6"
        >
          <TouchableOpacity
            // onPress={() => setActiveCategory(true)}
            onPress={() => handleCategorySelect("Self-help")}
            className="p-2 rounded-full shadow bg-[#d0d0f5] border" 
          >
            <Image
              style={{ width: 45, height: 45 }}
              source={require("../assets/images/selfhelp.png")}
            />
          </TouchableOpacity>
          <Text className="text-sm text-gray-500">Self-help</Text>
        </View>
        <View
          className="flex justify-center items-center mr-6"
        >
          <TouchableOpacity
            // onPress={() => setActiveCategory(true)}
            onPress={() => handleCategorySelect("History")}
            className="p-2 rounded-full shadow bg-[#d0d0f5] border" 
          >
            <Image
              style={{ width: 45, height: 45 }}
              source={require("../assets/images/history.png")}
            />
          </TouchableOpacity>
          <Text className="text-sm text-gray-500">History</Text>
        </View>
        <View
          className="flex justify-center items-center mr-6"
        >
          <TouchableOpacity
            // onPress={() => setActiveCategory(true)}
            onPress={() => handleCategorySelect("Spiritual")}
            className="p-2 rounded-full shadow bg-[#d0d0f5] border" 
          >
            <Image
              style={{ width: 45, height: 45 }}
              source={require("../assets/images/spiritual.png")}
            />
          </TouchableOpacity>
          <Text className="text-sm text-gray-500">Spritiual</Text>
        </View>
        <View
          className="flex justify-center items-center mr-6"
        >
          <TouchableOpacity
            // onPress={() => setActiveCategory(true)}
            onPress={() => handleCategorySelect("Adventure")}
            className="p-2 rounded-full shadow bg-[#d0d0f5] border" 
          >
            <Image
              style={{ width: 45, height: 45 }}
              source={require("../assets/images/adventure.png")}
            />
          </TouchableOpacity>
          <Text className="text-sm text-gray-500">Adventure</Text>
        </View>
        <View
          className="flex justify-center items-center mr-6"
        >
          <TouchableOpacity
            // onPress={() => setActiveCategory(true)}
            onPress={() => handleCategorySelect("Comics")}
            className="p-2 rounded-full shadow bg-[#d0d0f5] border" 
          >
            <Image
              style={{ width: 45, height: 45 }}
              source={require("../assets/images/comic.png")}
            />
          </TouchableOpacity>
          <Text className="text-sm text-gray-500">Comics</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;
