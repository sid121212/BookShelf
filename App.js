import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/AppNavigation";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

export default function App() {
  

  return <AppNavigation />;
}
