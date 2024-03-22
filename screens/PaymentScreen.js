import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Payment = () => {
  const navigation = useNavigation();

  const handlePaymentStatus = async (status) => {
    const currentDate = new Date();
    const user = JSON.parse(await AsyncStorage.getItem("credentials"));
    const orders = {
      user_id: user.user_id,
      date_created: currentDate.toISOString().split("T")[0], // Current date as string
      time_created: currentDate.toISOString().split("T")[1].split(".")[0], // Current time as string
      status: status === 'success', // Payment status ('success' or 'failure')
    };

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_domain}create_order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orders),
        }
      );

      const responseData = await response.json();
      console.log(responseData); // Log the response message
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.successButton]}
        onPress={() => {
          handlePaymentStatus("success");
          navigation.navigate("Orders");
        }}
      >
        <Text style={styles.buttonText}>Success</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.failureButton]}
        onPress={() => {
          handlePaymentStatus("failure");
          navigation.navigate("Orders");
        }}
      >
        <Text style={styles.buttonText}>Failure</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 15,
    width: 150,
    margin: 30,
  },
  successButton: {
    backgroundColor: "#4CAF50", // green color for success
  },
  failureButton: {
    backgroundColor: "#F44336", // red color for failure
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default Payment;
