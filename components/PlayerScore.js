import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlayerScore = ({ playerName, score }) => {
  const bars = [];
  for (let i = 0; i < score; i++) {
    bars.push(<View key={i} style={styles.bar} />);
  }
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{playerName}</Text>
      </View>
      <View style={styles.scoreContainer}>{bars}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  nameContainer: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  bar: {
    height: 10,
    width: 30,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
});

export default PlayerScore;
