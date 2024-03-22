import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignupScreen from "../screens/SignupScreen";
import Dashboard from "../screens/Dashboard";
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookScreen from "../screens/BookScreen";
import AddBookScreen from "../screens/AddBookScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PaymentScreen from "../screens/PaymentScreen";
import OrderScreen from "../screens/OrderScreen";
import UserBookScreen from "../screens/UserBookScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(await AsyncStorage.getItem("credentials"));
      // console.log(user)
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Dashboard" : "Welcome"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BookScreen" component={BookScreen} />
        <Stack.Screen name="AddBookScreen" component={AddBookScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Orders" component={OrderScreen} />
        <Stack.Screen name="Books" component={UserBookScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
