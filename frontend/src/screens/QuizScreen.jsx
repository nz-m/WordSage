import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../themes/colors";
import Question from "../components/Question";
import FinishMessage from "../components/FinishMessage";

const QuizScreen = ({ navigation }) => {
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes
  const [calculatedScore, setCalculatedScore] = useState(0);

  const handleFinishQuiz = () => {
    calculateScore();
    setIsQuizCompleted(true);
  };

  const handleResult = () => {
    navigation.navigate("Result", { score: calculatedScore });
  };

  const calculateScore = () => {
    let score = calculatedScore;
    const currentQuestionData = questions[currentQuestion];
    if (selectedAnswer === currentQuestionData.correctAnswer) {
      score++;
    }
    setCalculatedScore(score);
  };

  const handleNextQuestion = () => {
    calculateScore();

    if (currentQuestion === questions.length - 1) {
      handleFinishQuiz();
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
    }
  };

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
      {!isQuizCompleted ? (
        <>
          <Text style={styles.timer}>
            Remaining Time: {Math.floor(remainingTime / 60)}:
            {remainingTime % 60}
          </Text>

          <Text style={styles.subtitle}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>

          <Question
            question={questions[currentQuestion]}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
          {selectedAnswer !== null && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextQuestion}
              disabled={remainingTime === 0}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestion === questions.length - 1 ? "Done" : "Next"}
              </Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
          <FinishMessage />

          <TouchableOpacity style={styles.finishButton} onPress={handleResult}>
            <Text style={styles.finishButtonText}>Go to result</Text>
          </TouchableOpacity>
        </>
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
