import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LevelUpAssessmentScreen = () => {
  const navigator = useNavigation();

  const assessmentDetails = {
    maxAttemptsPerDay: 1,
    numOfQuestions: 10,
    timeLimit: "15 minutes",
    passingScore: "90%",
  };

  const handleStartAssessment = () => {
    navigator.navigate("Quiz");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leveling Up Assessment</Text>
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>
          You can attempt this test once a day.
        </Text>
        <Text style={styles.messageText}>
          There will be {assessmentDetails.numOfQuestions} questions to answer
          in {assessmentDetails.timeLimit}.
        </Text>
        <Text style={styles.messageText}>
          Achieving {assessmentDetails.passingScore} score will level you up.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStartAssessment}
      >
        <Text style={styles.startButtonText}>Start Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  messageBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  startButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default LevelUpAssessmentScreen;
