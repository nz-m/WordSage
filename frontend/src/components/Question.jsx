import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const Question = ({ question, selectedAnswer, setSelectedAnswer }) => {
  return (
    <>
      <Text style={styles.question}>{question.questionText}</Text>
      {question.options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionButton,
            selectedAnswer === option.id ? { backgroundColor: "#fca311" } : {},
          ]}
          onPress={() => setSelectedAnswer(option.id)}
        >
          <Text style={styles.optionText}>{option.optionText}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 20,
  },
  optionButton: {
    width: 250,
    height: 50,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: colors.primaryText,
    width: "100%",
    height: 50,
    borderRadius: 8,
    textAlign: "center",
    padding: 10,
  },
});

export default Question;
