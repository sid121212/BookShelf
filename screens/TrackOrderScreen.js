import React, { useState, useEffect } from 'react';
import { View, Text, ProgressViewIOS, StyleSheet } from 'react-native';

const TrackOrdersScreen = ({ route }) => {
  const { order } = route.params;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (progress < 1) {
      timer = setTimeout(() => {
        setProgress(progress + 0.1);
      }, 10000); // Update every 10 seconds

      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <View style={styles.container}>
      <Text>Order ID: {order.id}</Text>
      <Text>Status: {order.status}</Text>
      <ProgressViewIOS progress={progress} />
      <Text>Estimated Time Left: {Math.round((1 - progress) * 120)} seconds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TrackOrdersScreen;
