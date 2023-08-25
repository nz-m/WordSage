import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import LoadingScreen from "../shared/LoadingScreen";

const LevelUpTestResult = () => {
  const navigator = useNavigation();
  const { scorePercentage } = useSelector((state) => state.levelUpTest);
  const { user } = useSelector((state) => state.auth);

  if ((scorePercentage !== 0 && !scorePercentage) || !user) {
    return <LoadingScreen />;
  }

  const isLeveledUp = scorePercentage >= 80;

  const handleContinue = () => {
    navigator.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {isLeveledUp ? "Congratulations!" : "Unfortunate..."}{" "}
      </Text>
      <Text style={styles.scoreText}>
        {isLeveledUp
          ? `You've leveled up to ${user.level}!`
          : "Better luck next time."}
      </Text>
      <Text style={styles.scoreText}>Your Score: {scorePercentage}%</Text>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
  },
  continueButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default LevelUpTestResult;
