import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
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
import { initializeApp } from '@firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";



const firebaseconfig = {
  apiKey: process.env.EXPO_PUBLIC_apiKey,
  authDomain: process.env.EXPO_PUBLIC_authDomain,
  projectId: process.env.EXPO_PUBLIC_projectId,
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_appId,
  measurementId: process.env.EXPO_PUBLIC_measurementId,
}

// firebaseconfig
const app = initializeApp(firebaseconfig);


export default function SignupScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);

  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log("User logged out successfully!");
        await signOut(auth);
      } else {
        // Sign in or sign up
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully!');
        navigation.navigate('Login');
        
        
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };


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
            value={name}
            placeholder="Enter Name"
            onChangeText={(newText) => setName(newText)}
          />
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="john@gmail.com"
            value={email}
            onChangeText={(newText) => setEmail(newText)}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="password"
            value={password}
            onChangeText={(newText) => setPassword(newText)}
          />
          <TouchableOpacity style={styles.signupButton}>
            <Text style={styles.buttonText} onPress={handleAuthentication}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}> Log In ?</Text>
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
    color: "black",
    fontWeight: 600,
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
