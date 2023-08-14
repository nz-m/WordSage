import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../themes/colors";
import Question from "../components/Question";
import FinishMessage from "./FinishMessage";
import { useSelector } from "react-redux";

const LevelAssessmentScreen = ({ navigation }) => {
  const questions = useSelector((state) => state.levelAssessment.questions);

  const [userAnswers, setUserAnswers] = useState([]);

  console.log("userAnswers", userAnswers);

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes

  const handleFinishQuiz = () => {
    setIsQuizCompleted(true);
  };

  const handleResult = () => {
    navigation.navigate("LevelAssessmentResult", { userAnswers });
  };

  const handleNextQuestion = () => {
    const currentQuestionData = questions[currentQuestion];
    const answerData = {
      questionId: currentQuestionData._id,
      selectedAnswer,
    };

    setUserAnswers((prevAnswers) => [...prevAnswers, answerData]);

    if (currentQuestion === questions.length - 1) {
      handleFinishQuiz();
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRemainingTime((prevTime) => prevTime - 1);
  //   }, 1000);
  //
  //   return () => clearInterval(interval);
  // }, []);
  //
  // useEffect(() => {
  //   if (remainingTime === 0) {
  //     handleFinishQuiz();
  //   }
  // }, [remainingTime]);

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        {!isQuizCompleted ? (
          <>
            <Text style={styles.timer}>
              Remaining Time: {Math.floor(remainingTime / 60)}:
              {remainingTime % 60}
            </Text>

            <Text style={styles.questionNumber}>
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

            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleResult}
            >
              <Text style={styles.finishButtonText}>Go to result</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#3988FF",
  },
  container2: {
    //flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: "white",
    borderRadius: 30,
  },
  timer: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 20,
  },
  questionNumber: {
    color: "gray",
    marginBottom: 10,
  },

  nextButton: {
    width: 150,
    height: 50,
    backgroundColor: "#3988FF",
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
    width: 150,
    height: 50,
    backgroundColor: "#3988FF",
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

export default LevelAssessmentScreen;
