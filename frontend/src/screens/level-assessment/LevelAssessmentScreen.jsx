import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import Question from "../../components/Question";
import FinishMessage from "../shared/FinishMessage";
import { useSelector, useDispatch } from "react-redux";
import { assessLevel } from "../../features/level-assessment/levelAssessmentThunks";

const LevelAssessmentScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.levelAssessment.questions);

  const [userAnswers, setUserAnswers] = useState([]);

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes

  useEffect(() => {
    if (isQuizCompleted) {
      dispatch(assessLevel(userAnswers));
    }
  }, [isQuizCompleted]);
  const handleResult = () => {
    navigation.replace("LevelAssessmentResult");
  };

  const handleNextQuestion = () => {
    const currentQuestionData = questions[currentQuestion];

    // Only add an answer if an option is selected
    if (selectedAnswer !== null) {
      const answerData = {
        questionId: currentQuestionData._id,
        selectedAnswer,
      };
      setUserAnswers((prevAnswers) => [...prevAnswers, answerData]);
    }

    if (currentQuestion === questions.length - 1) {
      setIsQuizCompleted(true);
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      setIsQuizCompleted(true);
    }
  }, [remainingTime]);

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
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextQuestion}
              disabled={remainingTime === 0}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestion === questions.length - 1 ? "Done" : "Next"}
              </Text>
            </TouchableOpacity>
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
    backgroundColor: colors.primaryBackground,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: "white",
    borderRadius: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
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
    width: 100,
    height: 45,
    backgroundColor: "#3988FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
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
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 6,
    marginTop: 20,
  },
  finishButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LevelAssessmentScreen;
