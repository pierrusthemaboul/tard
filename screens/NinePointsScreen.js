import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import QuestionsComponent from '../components/QuestionComponent';

const NinePointsScreen = () => {
  const [score, setScore] = useState(0);

  const handleAnswerCorrect = (value) => {
    setScore((prevScore) => prevScore + value);
  };

  return (
    <View style={styles.container}>
      <QuestionsComponent onAnswerCorrect={handleAnswerCorrect} score={score} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default NinePointsScreen;
