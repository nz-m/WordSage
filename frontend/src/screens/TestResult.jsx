import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../themes/colors";

const TestResult = ({ navigation, route }) => {
  const { score } = route.params;

  const [userlevel, setUserlevel] = useState("");

  useEffect(() => {
    let level = "";
    if (score >= 3) {
      level = "Advanced";
    } else if (score >= 2) {
      level = "Intermediate";
    } else {
      level = "Beginner";
    }
    setUserlevel(level);
  }, [score]);

  const handleFinish = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.resultText}>Your Score: {score}/3</Text>
      <Text style={styles.levelText}>
        Based on your score, your English vocabulary level is: {userlevel}
      </Text>
      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: colors.primaryText,
    marginBottom: 20,
  },
  levelText: {
    fontSize: 18,
    color: colors.primaryText,
    marginBottom: 40,
  },
  finishButton: {
    width: 200,
    height: 50,
    backgroundColor: "#3988FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  finishButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TestResult;
