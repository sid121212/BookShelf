import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null); // State to hold selected image URI
  const [selectedFile, setSelectedFile] = useState(null); // State
  const [imageUrl, setImageUrl] = useState(null); // State to hold uploaded image URL
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(await AsyncStorage.getItem("credentials"));
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_domain}profileImage/${user.user_id}`
        );

        const data = await response.json();
        // console.log("Data: " + data);
        const imageUrl = data.img_url;
        // Set the retrieved profile image URL to state
        // console.log("Image Url -> "+imageUrl);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
      setUser(user);
    };

    fetchUser();
  }, []);

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
      setSelectedFile(result);
      // setSelectedImage(result.assets[0].uri); // Set selected image URI
    }
  };

  const saveImageToDb = async (imgurl) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_domain}profileImage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.user_id,
            img_url: imgurl,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded to Db:", data);
        // Handle the response from the server as needed
      } else {
        console.error("Failed to upload image to Db. Status:", response);
        // Handle the error response from the server
      }
    } catch (error) {
      console.error("Error uploading image to Db:", error);
      // Handle the error
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
        await saveImageToDb(data.data.url);
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

  const handleSignout = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("credentials"));
    const url = `${process.env.EXPO_PUBLIC_domain}emptyCart/?user_id=${user.user_id}`;
    // console.log(url);
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        return response.json();
      })
      .then((data) => {
        console.log("Cart emptied successfully:", data);
        AsyncStorage.removeItem("credentials");
        navigation.navigate("Welcome");
      })
      .catch((error) => {
        console.error("Error emptying cart:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <TouchableOpacity onPress={pickImage}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            ) : (
              <Image
                source={{
                  uri: "https://i.ibb.co/sCtsP2t/image.jpg",
                }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            )}
          </TouchableOpacity>
          <View style={{ marginLeft: 20 }}>
            <Text
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              Hi, {user ? user.username : "Anonymous"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon.MapPin name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Kolkata, India
          </Text>
        </View>
        <View style={styles.row}>
          <Icon.Phone name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            +91-900000009
          </Text>
        </View>
        <View style={styles.row}>
          <Icon.Mail name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            john_doe@email.com
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Text>₹140.50</Text>
          <Text>Wallet</Text>
        </View>
        <TouchableOpacity
          style={styles.infoBox}
          onPress={() => {
            navigation.navigate("Orders");
          }}
        >
          <Text>12</Text>
          <Text>Your Orders</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>{navigation.navigate('Books')}}>
        <View style={styles.menuItem}>
          <Icon.BookOpen name="share-outline" color="#FF6347" size={25} />
          <Text style={styles.menuItemText}>Your Books</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignout}>
        <View style={styles.menuItem}>
          <Icon.LogOut name="share-outline" color="#FF6347" size={25} />
          <Text style={styles.menuItemText}>Sign Out</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
          <Icon.HelpCircle
            name="account-check-outline"
            color="#FF6347"
            size={25}
          />
          <Text style={styles.menuItemText}>Help</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
