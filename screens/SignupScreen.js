import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import { themeColors } from "../theme/Index";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeftIcon size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/welcome.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value="john snow"
            placeholder="Enter Name"
          />
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value="john.snow@gmail.com"
            placeholder="Enter Name"
          />
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            value="9283409284"
            placeholder="Enter Name"
          />
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Log In ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.bg,
  },
  safeArea: {
    flex: 1,
  },
  backButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  backButton: {
    backgroundColor: "yellow",
    padding: 8,
    borderRadius: 20,
    marginLeft: 16,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 175,
    height: 160,
  },
  formContainer: {
    flex: 2,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingTop: 24,
    
  },
  form: {
    flex: 1,
  },
  label: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
  },
  input: {
    padding: 16,
    backgroundColor: "#E6E6FA",
    color: "gray",
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 5,
  },
  signupButton: {
    backgroundColor: "yellow",
    padding: 12,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  loginLink:{
    marginTop: 14,
    textAlign: 'center',  
    fontSize: 15,
    color: '#877dfa',
    fontWeight: 'bold'
  },
});
