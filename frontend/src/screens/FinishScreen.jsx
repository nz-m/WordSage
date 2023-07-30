import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../themes/colors";

const FinishScreen = ({ navigation, route }) => {
  const { score } = route.params; // Get the score from the quiz result

  const [userRank, setUserRank] = useState("");

  useEffect(() => {
    // Logic to set the user's current rank based on the score
    let rank = "";
    if (score >= 3) {
      rank = "Advanced";
    } else if (score >= 2) {
      rank = "Intermediate";
    } else {
      rank = "Beginner";
    }
    setUserRank(rank);
  }, [score]);

  const handleFinish = () => {
    // Logic to navigate to the HomeScreen or any other screen after the quiz is completed
    // Replace 'Home' with the actual screen name where you want to navigate the user
    // after the quiz is completed.
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.resultText}>Your Score: {score}/15</Text>
      {/* Add any additional message or information about the result here */}
      <Text style={styles.rankText}>Your Current Rank: {userRank}</Text>
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
  rankText: {
    fontSize: 18,
    color: colors.primaryText,
    marginBottom: 40,
  },
  finishButton: {
    width: 200,
    height: 50,
    backgroundColor: colors.accentColor,
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

export default FinishScreen;
