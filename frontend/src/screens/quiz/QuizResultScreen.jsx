import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "../shared/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import { getResult } from "../../features/quiz/quizThunks";
import { resetQuizResult } from "../../features/quiz/quizSlice";
import colors from "../../constants/colors";

const QuizResultScreen = ({
  route: {
    params: { lessonTitle },
  },
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { quizResult } = useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(getResult({ lessonTitle }));
    return () => {
      dispatch(resetQuizResult());
    };
  }, []);

  if (!quizResult) {
    return <LoadingScreen />;
  }

  const congratulationText = "Congratulations!";
  const { timeTaken, score, startTime } = quizResult;

  const handleCloseButton = () => {
    navigation.replace("Vocabulary Lessons");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.congratulationText}>{congratulationText}</Text>
        <Text style={styles.infoText}>Time Taken: {timeTaken}</Text>
        <Text style={styles.infoText}>Score: {score}</Text>
        <Text style={styles.infoText}>Started At : {startTime}</Text>

        <TouchableOpacity style={styles.button} onPress={handleCloseButton}>
          <Text style={styles.buttonText}>Close</Text>
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
    backgroundColor: "#F5F5F5",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    width: "80%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  congratulationText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default QuizResultScreen;
