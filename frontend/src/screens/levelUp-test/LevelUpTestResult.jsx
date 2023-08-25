import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "../shared/LoadingScreen";
import { colors } from "react-native-elements";
import { resetLearnState } from "../../features/learn/learnSlice";

const LevelUpTestResult = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();

  const { scorePercentage } = useSelector((state) => state.levelUpTest);
  const { user } = useSelector((state) => state.auth);

  if ((scorePercentage !== 0 && !scorePercentage) || !user) {
    return <LoadingScreen />;
  }

  const isLeveledUp = scorePercentage >= 80;

  const handleContinue = async () => {
    await dispatch(resetLearnState());
    navigator.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {isLeveledUp ? "Congratulations!" : "Keep Going!"}
      </Text>
      <Text style={styles.scoreText}>Your Score: {scorePercentage}%</Text>
      <Text style={styles.textMsg}>
        {isLeveledUp
          ? `You've successfully leveled up to ${user.level}!`
          : "You can do better next time."}
      </Text>
      {!isLeveledUp && (
        <Text style={styles.neededScoreMsg}>
          To advance to the next level, you'll need to achieve a minimum score
          of 80%. Keep practicing!
        </Text>
      )}

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
    backgroundColor: "#f0f0f0",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  textMsg: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  neededScoreMsg: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    color: "#666",
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LevelUpTestResult;
