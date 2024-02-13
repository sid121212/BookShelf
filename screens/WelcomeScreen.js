import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView from the correct package
import { themeColors } from '../theme/Index';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.bg }]}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Let's Get Started!</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/welcome.png")}
            style={styles.image}
            resizeMode='contain'
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.bg,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 350,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'yellow',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginLink: {
    fontWeight: 'bold',
    color: 'yellow',
  },
});
