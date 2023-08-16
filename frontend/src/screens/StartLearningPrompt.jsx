import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../themes/colors";
import { useDispatch, useSelector } from "react-redux";
import { fetchLessons, startLearning } from "../features/learn/learnThunks";

const StartLearningPrompt = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isStarting, isStarted, startingError } = useSelector(
    (state) => state.learn
  );

  const handleStartLearning = async () => {
    await dispatch(startLearning());
    await dispatch(fetchLessons());
  };

  useEffect(() => {
    if (isStarted) {
      navigation.replace("LessonList");
    }
  }, [isStarted]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Your Vocabulary Journey!</Text>
      {startingError && <Text style={styles.error}>{startingError}</Text>}
      {isStarting ? (
        <ActivityIndicator size="large" color={colors.accentColor} />
      ) : (
        <>
          <Text style={styles.instructions}>
            Get ready for a language learning journey with 10 engaging lessons.
            Topics range from everyday conversations to Work and Careers, Travel
            and Transportation, and more!
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartLearning}
            disabled={isStarting || isStarted}
          >
            <Text style={styles.buttonText}>Start Learning</Text>
          </TouchableOpacity>
        </>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 15,
    textAlign: "center",
  },
  instructions: {
    fontSize: 16,
    color: colors.secondaryText,
    marginBottom: 15,
    textAlign: "center",
  },
  startButton: {
    width: 200,
    height: 50,
    backgroundColor: colors.accentColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default StartLearningPrompt;