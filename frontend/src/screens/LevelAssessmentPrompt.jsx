import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import colors from "../themes/colors";
import { fetchQuestions } from "../features/level-assessment/levelAssessmentThunks";

const LevelAssessmentPrompt = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  const handleStartTest = () => {
    navigation.navigate("LevelAssessment");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {user.name}!</Text>
      <Text style={styles.welcomeMessage}>Welcome to WordSage</Text>
      <Text style={styles.subtitle}>Your Personal Vocabulary Tutor</Text>
      <Text style={styles.description}>
        Welcome aboard! Before we begin, let's evaluate your current English
        vocabulary level. This test is designed to provide us with insights into
        your strengths. Feel free to{" "}
        <Text style={styles.emphasized}>
          focus on the questions you are confident about
        </Text>
        , as your responses will help us craft a personalized learning journey
        that aligns with your skills. Remember, you can also{" "}
        <Text style={styles.emphasized}>
          skip any questions that you find challenging
        </Text>
        . Your input is valuable in ensuring an accurate assessment.
      </Text>

      <View style={styles.detailsContainer}>
        <View style={styles.quizDetails}>
          <Ionicons name="time" size={30} color="#2ba3e3" />
          <Text style={styles.detailsText}>Time allowed</Text>
          <Text style={styles.detailsTextSub}>10 mins</Text>
        </View>
        <View style={styles.quizDetails}>
          <AntDesign name="questioncircle" size={27} color="#e32b2b" />
          <Text style={styles.detailsText}>Total number of questions</Text>
          <Text style={styles.detailsTextSub}>15</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={handleStartTest}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryBackground,
    paddingHorizontal: 20,
  },
  emphasized: {
    fontWeight: "bold",
    color: colors.primaryText,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 5,
  },
  welcomeMessage: {
    fontSize: 24,
    color: colors.primaryText,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.secondaryText,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: colors.secondaryText,
  },
  startButton: {
    width: 200,
    height: 50,
    backgroundColor: "#3988FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 7,
    marginBottom: 20,
  },
  quizDetails: {
    backgroundColor: "#e8e8e8",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  detailsText: {
    color: "gray",
    fontSize: 16,
  },
  detailsTextSub: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LevelAssessmentPrompt;
