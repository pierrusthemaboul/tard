import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import questions from '../questions.json';

const QuestionsComponent = ({ onAnswerCorrect, score }) => {
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [timeRemainingSecondary, setTimeRemainingSecondary] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
  }, []);

  useEffect(() => {
    if (timeRemaining === null) {
      setTimeRemaining(30);
    } else if (timeRemaining === 0) {
      // ... (le reste du code existant dans cet effet de bord)
    } else {
      const timer = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeRemaining, currentQuestionIndex]);

  useEffect(() => {
    if (timeRemainingSecondary !== null) {
      const timerSecondary = setInterval(() => {
        setTimeRemainingSecondary((prevTimeRemainingSecondary) => prevTimeRemainingSecondary - 1);
      }, 1000);

      return () => {
        clearInterval(timerSecondary);
      };
    }
  }, [timeRemainingSecondary]);

  useEffect(() => {
    if (timeRemaining === 0 || timeRemainingSecondary === 0) {
      setMessage(`La bonne réponse était : ${questions[currentQuestionIndex].answer}`);
      setTimeout(() => {
        setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
        setMessage('');
        setTimeRemaining(null);
        setTimeRemainingSecondary(null);
      }, 2000);
    }
  }, [timeRemaining, timeRemainingSecondary]);

  const currentQuestion = questions[currentQuestionIndex];

  const checkAnswer = () => {
    if (currentQuestion && currentQuestion.answer && answer.toLowerCase() === currentQuestion.answer.toString().toLowerCase()) {
      setMessage('Bravo !');
      onAnswerCorrect(currentQuestion.value);
      setShowAnswer(false);
      setTimeRemainingSecondary(null);
      setTimeout(() => {
        setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
        setMessage('');
        setAnswer('');
        setTimeRemaining(null);
      }, 2000);
    } else {
      setMessage(`Faux, la bonne réponse était : ${questions[currentQuestionIndex].answer}`);
      setShowAnswer(false);
      setTimeRemainingSecondary(null);
      setTimeout(() => {
        setCurrentQuestionIndex(Math.floor(Math.random() * questions.length));
        setMessage('');
        setAnswer('');
        setTimeRemaining(null);
      }, 2000);
    }
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setTimeRemaining(null);
    setTimeRemainingSecondary(2);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  if (!questions || !questions.length) {
    return <Text>Pas de question trouvée.</Text>;
  }

  return (
    <View>
      <Text style={styles.theme}>{currentQuestion.theme}</Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {timeRemaining !== null && <Text>Temps restant : {timeRemaining} secondes</Text>}
      {showAnswer && (
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={answer}
          onChangeText={setAnswer}
          onSubmitEditing={checkAnswer}
        />
      )}
      {!showAnswer && (
        <View style={styles.buttonContainer}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.button}>
            <Text style={styles.buttonText} onPress={handleShowAnswer}>Répondre</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  theme: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  message: {
    marginBottom: 10,
    color: 'green',
  },
  score: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default QuestionsComponent;

