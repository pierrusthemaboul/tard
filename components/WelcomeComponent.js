import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const WelcomeComponent = ({ onWelcomeFinished }) => {
  const [welcomeAnimation, setWelcomeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(welcomeAnimation, {
      toValue: 1,
      duration: 200,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        onWelcomeFinished();
      }, 3000);
    });
  }, []);

  const welcomeStyles = {
    opacity: welcomeAnimation,
    transform: [
      {
        translateY: welcomeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
      {
        scale: welcomeAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>9 POINTS GAGNANTS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFA500',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default WelcomeComponent;
