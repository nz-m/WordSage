import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../themes/colors";

const QuizScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes

  useEffect(() => {
    // Timer logic
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Listen for changes in selectedAnswers
    handleCalculateScore();
  }, [selectedAnswers]);

  const handleCalculateScore = () => {
    let calculatedScore = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
  };

  const handleFinishQuiz = () => {
    // Calculate the score one more time before navigating to the finish screen
    handleCalculateScore();
    navigation.navigate("Finish", { score });
  };

  const handleNextQuestion = () => {
    // Save the selected answer for the current question
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questions[currentQuestion].id]: selectedAnswer,
    }));

    // Move to the next question or finish the quiz
    if (currentQuestion === questions.length - 1) {
      handleFinishQuiz();
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  useEffect(() => {
    if (remainingTime === 0) {
      handleFinishQuiz();
    }
  }, [remainingTime]);
  const questions = [
    {
      id: 1,
      questionText: "What is the capital of France?",
      options: [
        { id: 1, optionText: "London" },
        { id: 2, optionText: "Paris" },
        { id: 3, optionText: "Berlin" },
        { id: 4, optionText: "Rome" },
      ],
      correctAnswer: 2,
    },
    {
      id: 2,
      questionText: "Who is CEO of Tesla?",
      options: [
        { id: 1, optionText: "Jeff Bezos" },
        { id: 2, optionText: "Elon Musk" },
        { id: 3, optionText: "Bill Gates" },
        { id: 4, optionText: "Tony Stark" },
      ],
      correctAnswer: 2,
    },
    {
      id: 3,
      questionText: "The iPhone was created by which company?",
      options: [
        { id: 1, optionText: "Apple" },
        { id: 2, optionText: "Intel" },
        { id: 3, optionText: "Amazon" },
        { id: 4, optionText: "Microsoft" },
      ],
      correctAnswer: 1,
    },
  ];

  useEffect(() => {
    // Timer logic
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      handleFinishQuiz();
    }
  }, [remainingTime]);

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
      {questions[currentQuestion].options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionButton,
            selectedAnswer === option.id
              ? { backgroundColor: colors.accentColor }
              : {},
          ]}
          onPress={() => {
            setSelectedAnswer(option.id);
          }}
        >
          <Text style={styles.optionText}>{option.optionText}</Text>
        </TouchableOpacity>
      ))}

      {/* Next/Finish Quiz Button */}
      {selectedAnswer !== null && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next"}
          </Text>
        </TouchableOpacity>
      )}
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
  optionButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.secondaryBackground,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 18,
    color: colors.primaryText,
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
