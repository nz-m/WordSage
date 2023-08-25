import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsAndStartTest } from "../../features/level-up-test/levelUpThunks";
import { colors } from "react-native-elements";

const LevelUpTestPrompt = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const { isStarting, startingError } = useSelector(
    (state) => state.levelUpTest
  );

  const assessmentDetails = {
    maxAttemptsPerDay: 1,
    numOfQuestions: 10,
    timeLimit: "10 minutes",
    passingScore: "80%",
  };

  const handleStartAssessment = async () => {
    await dispatch(fetchQuestionsAndStartTest());
    navigator.replace("LevelUpTest");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leveling Up Test</Text>
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>
          You can attempt this test once a day.
        </Text>
        <Text style={styles.messageText}>
          There will be {assessmentDetails.numOfQuestions} questions to answer
          in {assessmentDetails.timeLimit}.
        </Text>
        <Text style={styles.messageText}>
          By attaining a score of {assessmentDetails.passingScore} or higher,
          you'll successfully elevate your level.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStartAssessment}
        disabled={isStarting}
      >
        {isStarting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.startButtonText}>Start Now</Text>
        )}
      </TouchableOpacity>
      {startingError && <Text style={styles.errorText}>{startingError}</Text>}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  messageBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 6,
    marginBottom: 20,
    elevation: 3,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    color: "#666",
  },
  startButton: {
    width: "40%",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 6,
    elevation: 3,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default LevelUpTestPrompt;
