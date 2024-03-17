import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(await AsyncStorage.getItem("credentials"));
      setUser(user);
    };
    fetchUser();
  }, [file]);

  //   useEffect(() => {
  //     console.log("Image has been uploaded", file);
  //   }, [file]);

  // const pickImage = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (status !== "granted") {
  //     Alert.alert(
  //       "Permission Denied",
  //       `Sorry, we need camera
  //            roll permission to upload images.`
  //     );
  //   } else {
  //     const result = await ImagePicker.launchImageLibraryAsync();
  //     //   const temp = JSON.parse(result)
  //     console.log("this", result.assets[0]);
  //     var formdata = new FormData();
  //     formdata.append("files", {
  //       uri: result.assets[0].uri,
  //       filename: result.assets[0].fileName,
  //       type: result.assets[0].type,
  //     });

  //     setFile(toString(result.assets[0].uri));
  //   }
  // };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  // Function to handle image upload
  const uploadImage = async () => {
    if (!selectedImage) {
      Alert.alert("Please select an image before uploading.");
      return;
    }

    // Replace 'your-backend-upload-url' with your actual backend upload endpoint
    const uploadUrl = "your-backend-upload-url";

    const formData = new FormData();
    formData.append("image", {
      uri: selectedImage,
      name: "image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        Alert.alert("Image uploaded successfully!");
        // Clear selected image after successful upload
        setSelectedImage(null);
      } else {
        Alert.alert("Failed to upload image. Please try again later.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error uploading image. Please try again later.");
    }
  };

  const handleSignout = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("credentials"));
    const url = `https://d83c-2405-201-5c09-ab2d-b411-865c-a274-a9a0.ngrok-free.app/emptyCart/?user_id=${user.user_id}`;
    console.log(url);
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
            {file ? (
              <Image
                source={{ uri: file }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            ) : (
              <Image
                source={{
                  uri: "https://i.ibb.co/d6nMPcm/pexels-pixabay-159872.jpg",
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
        <View style={styles.infoBox}>
          <Text>12</Text>
          <Text>Orders</Text>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon.Heart name="heart-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon.CreditCard name="credit-card" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon.HelpCircle
              name="account-check-outline"
              color="#FF6347"
              size={25}
            />
            <Text style={styles.menuItemText}>Support</Text>
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
            <Icon.Settings name="settings-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
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
