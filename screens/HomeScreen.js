import { View, Text } from 'react-native'
import React from 'react'




export default function HomeScreen() {



  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleNavigate}>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}