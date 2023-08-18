import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getWords, startLesson } from "../features/learn/learnThunks";

const LessonDetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { lesson } = route.params;

  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const [isStartPressed, setIsStartPressed] = useState(false);

  const {
    isStartingLesson,
    startingLessonError,
    isWordsFetching,
    wordsfetchingError,
    words,
  } = useSelector((state) => state.learn);

  const handleNavigation = () => {
    if (lesson.status === "in progress") {
      setIsContinuePressed(true);
    } else if (lesson.status === "not started") {
      handleStartLesson(lesson._id);
    }
  };

  const handleStartLesson = async (lessonId) => {
    await dispatch(startLesson(lessonId));
    setIsStartPressed(true);
  };

  useEffect(() => {
    if (isContinuePressed || isStartPressed) {
      if (words && words.length > 0 && words[0].lessonTitle === lesson.title) {
        navigation.replace("Word", {
          words,
          lessonId: lesson._id,
          lessonNumber: lesson.lessonNumber,
        });
      } else {
        dispatch(getWords(lesson.title));
      }
    }
  }, [isContinuePressed, isStartPressed, words]);

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <MaterialIcons name={lesson.icon} size={24} color={colors.primary} />
        <Text style={[styles.lessonTitle, { marginLeft: 8 }]}>
          {lesson.title}
        </Text>
      </View>

      {/* Display error message */}
      {startingLessonError ||
        (wordsfetchingError && (
          <Text style={styles.errorMessage}>
            {startingLessonError || wordsfetchingError}
          </Text>
        ))}

      {lesson.status === "not started" && (
        <Text style={styles.lessonDescription}>
          This lesson covers various vocabulary words and phrases related to{" "}
          {lesson.title}. After completing this lesson, you will be able to take
          the quiz to test your knowledge on this topic.
        </Text>
      )}
      {lesson.status === "complete" ? (
        <View>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Congratulations on completing this lesson!
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Take the quiz to test your knowledge on this topic.
          </Text>
        </View>
      ) : lesson.status === "in progress" ? (
        <View>
          <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
            Continue learning this lesson.
          </Text>
          <Text style={{ marginBottom: 20 }}>
            So far, you have learned 34/50 vocabulary in this lesson.
          </Text>
        </View>
      ) : (
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          Click the button below to start learning!
        </Text>
      )}

      {isStartingLesson || isWordsFetching ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <TouchableOpacity style={styles.quizButton} onPress={handleNavigation}>
          <Text style={styles.quizButtonText}>
            {lesson.status === "in progress"
              ? "Continue learning"
              : "Start Lesson"}
          </Text>
          <MaterialIcons name="arrow-forward" size={24} color={colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },

  innerContainer: {
    backgroundColor: colors.accentColor,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  lessonDescription: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 20,
  },
  quizButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3988FF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "space-between",
  },
  quizButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
  errorMessage: {
    color: colors.error,
    marginBottom: 10,
  },
});

export default LessonDetailsScreen;
