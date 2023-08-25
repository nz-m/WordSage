import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../shared/LoadingScreen";

import { startQuiz } from "../../features/quiz/quizThunks";
import { colors } from "react-native-elements";

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

  const onStartQuiz = async () => {
    await dispatch(startQuiz(quiz._id));

    if (isQuizStarted) {
      navigator.replace("Quiz");
    }
  };

  if (quizFetchingError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching quiz data.</Text>
      </View>
    );
  }

  if (!quiz) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{quiz.title}</Text>
        <Text style={styles.info}>
          <Text style={styles.boldText}>Number of Questions:</Text>{" "}
          {quiz.numberOfQuestions}
        </Text>
        <Text style={styles.info}>
          <Text style={styles.boldText}>Time Limit:</Text> {quiz.timeLimit}{" "}
          minutes
        </Text>
        <Text style={styles.info}>
          <Text style={styles.boldText}>Lesson Title:</Text> {quiz.lessonTitle}
        </Text>
        <TouchableOpacity
          style={[styles.startButton, isQuizStarting && styles.disabledButton]}
          onPress={onStartQuiz}
          disabled={isQuizStarting}
        >
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
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  buttonContent: {
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default QuizPromptScreen;
