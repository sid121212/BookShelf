import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeApp } from "@firebase/app";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "@firebase/auth";

// // firebaseconfig
// const firebaseconfig = {
//   apiKey: process.env.EXPO_PUBLIC_apiKey,
//   authDomain: process.env.EXPO_PUBLIC_authDomain,
//   projectId: process.env.EXPO_PUBLIC_projectId,
//   storageBucket: process.env.EXPO_PUBLIC_storageBucket,
//   messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
//   appId: process.env.EXPO_PUBLIC_appId,
//   measurementId: process.env.EXPO_PUBLIC_measurementId,
// }


export default function LoginScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);
  const [authstateChanged, setAuthStateChanged] = useState(false);

  
  useEffect(() => {
  }, [authstateChanged]);


  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('credentials', jsonValue);
    } catch (e) {
      console.error("User session not set:", error.message);
    }
  };

  const handleAuthentication = async () => {
    // console.log(`${process.env.EXPO_PUBLIC_domain}login`)
    try {
      if (user) {
        navigation.navigate('Dashboard');
      } else {
        const response = await fetch(`${process.env.EXPO_PUBLIC_domain}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          // console.log("User signed in successfully!",data["user_id"]);
          setAuthStateChanged(true);
          storeData({"user_id":data["user_id"],"username": username, "password": password});
          const user = JSON.parse(await AsyncStorage.getItem('credentials'));
          console.log("User signed in successfully",user);
          setUser(user);
          navigation.navigate("Dashboard");
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
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
      <View style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            value={username}
            onChangeText={(newText) => setUsername(newText)}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={(newText) => setPassword(newText)}
          />
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleAuthentication}>
            <Text style={styles.loginButtonText} >
              Login
            </Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signupLink}> Sign Up</Text>
            </TouchableOpacity>
          </View>
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
    flex: 0.5,
  },
  header: {
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
    width: 200,
    height: 200,
  },
  content: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingTop: 24,
    flex: 1,
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
    color: "black",
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 5,
  },
  forgotPassword: {
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "black",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "yellow",
    padding: 12,
    borderRadius: 20,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  orText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "black",
    fontWeight: "bold",
  },
  signupLink: {
    fontWeight: "bold",
    color: "#877dfa",
  },
});
