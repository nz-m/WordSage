import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FinishMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.congratulationsText}>Congratulations!</Text>
      <Text style={styles.messageText}>
        You have finished the quiz. Tap below to see your result.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  congratulationsText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default FinishMessage;
