import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { startQuiz } from "../../features/quiz/quizThunks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../shared/LoadingScreen";

const QuizPromptScreen = () => {
  const dispatch = useDispatch();
  const navigator = useNavigation();

  const {
    isQuizStarted,
    isQuizStarting,
    quizStartingError,
    isQuizFetching,
    quizFetchingError,
    quiz,
  } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (isQuizStarted) {
      navigator.replace("Quiz");
    }
  }, [isQuizStarted]);
  const onStartQuiz = async () => {
    await dispatch(startQuiz(quiz._id));
  };

  if (!quiz) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{quiz.title}</Text>
        <Text>Number of Questions: {quiz.numberOfQuestions}</Text>
        <Text>Time Limit: {quiz.timeLimit} minutes</Text>
        <Text>Lesson Title: {quiz.lessonTitle}</Text>
        <TouchableOpacity style={styles.startButton} onPress={onStartQuiz}>
          {isQuizStarting ? (
            <View style={styles.buttonContent}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Text style={styles.buttonText}>Start Quiz</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  fontWeight: "bold",
});

export default QuizPromptScreen;
