import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "../shared/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import { getResult } from "../../features/quiz/quizThunks";

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
  }, []);

  if (!quizResult) {
    return <LoadingScreen />;
  }

  const congratulationText = "Congratulations!";
  const { timeTaken, score, startTime } = quizResult;

  const handleDetailsButton = () => {
    // Navigate to quiz details screen
    // You need to define the details screen and navigation in your app
  };

  const handleCloseButton = () => {
    navigation.replace("LessonList");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.congratulationText}>{congratulationText}</Text>
      <Text style={styles.infoText}>Time Taken: {timeTaken}</Text>
      <Text style={styles.infoText}>Score: {score}</Text>
      <Text style={styles.infoText}>Start Time: {startTime}</Text>

      <TouchableOpacity style={styles.button} onPress={handleDetailsButton}>
        <Text style={styles.buttonText}>Show Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCloseButton}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
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
  congratulationText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QuizResultScreen;
