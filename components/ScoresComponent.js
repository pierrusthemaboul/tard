import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScoresComponent = ({ playerName, score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.playerName}>{playerName}</Text>
      <View style={styles.scoreContainer}>
        <View style={[styles.scoreBar, { width: score }]} />
      </View>
      <Text style={styles.score}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  playerName: {
    flex: 1,
    marginRight: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreContainer: {
    flex: 3,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  scoreBar: {
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
  },
  score: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default ScoresComponent;
