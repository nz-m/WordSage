import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../themes/colors";

const QuizScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const handleFinishQuiz = () => {
    navigation.navigate("Finish", { score });
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(900); // 900 seconds (15 minutes)

  const questions = [
    {
      id: 1,
      questionText: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Rome"],
      correctAnswer: "Paris",
    },
    {
      id: 2,
      questionText: "Who is CEO of Tesla?",
      options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
      correctAnswer: "Elon Musk",
    },
    {
      id: 3,
      questionText: "The iPhone was created by which company?",
      options: ["Apple", "Intel", "Amazon", "Microsoft"],
      correctAnswer: "Apple",
    },
    {
      id: 4,
      questionText: "How many Harry Potter books are there?",
      options: ["1", "4", "6", "7"],
      correctAnswer: "7",
    },
  ];

  useEffect(() => {
    // Timer logic
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setSelectedAnswer(null);
  };

  return (
    <View style={styles.container}>
      {/* Timer */}
      <Text style={styles.timer}>
        Remaining Time: {Math.floor(remainingTime / 60)}:{remainingTime % 60}
      </Text>

      {/* Question */}
      <Text style={styles.question}>
        {questions[currentQuestion].questionText}
      </Text>

      {/* Options */}
      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedAnswer === option
              ? { backgroundColor: colors.accentColor }
              : {},
          ]}
          onPress={() => setSelectedAnswer(option)}
          disabled={selectedAnswer !== null}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* Next Button */}
      {selectedAnswer !== null && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.finishButton} onPress={handleFinishQuiz}>
        <Text style={styles.finishButtonText}>Finish Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.primaryBackground,
  },
  timer: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
    color: colors.primaryText,
    width: "100%",
    height: 50,
    borderRadius: 8,
    textAlign: "center",
    padding: 10,
  },
  optionButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.secondaryBackground,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 5,
  },

  nextButton: {
    width: "50%",
    height: 50,
    backgroundColor: colors.accentColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  finishButton: {
    width: "50%",
    height: 50,
    backgroundColor: colors.accentColor,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 8,
    marginTop: 20,
  },
  finishButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizScreen;
