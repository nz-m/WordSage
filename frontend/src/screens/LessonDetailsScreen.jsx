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

const LessonDetailsScreen = ({
  route: {
    params: { lesson },
  },
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const [isStartPressed, setIsStartPressed] = useState(false);

  const {
    isStartingLesson,
    startingLessonError,
    isWordsFetching,
    wordsfetchingError,
    words,
  } = useSelector((state) => state.learn);

  const totalLearnedWords = words.filter((word) => word.isLearned).length;

  const handleNavigation = () => {
    if (lesson.status === "in progress" || lesson.status === "completed") {
      setIsContinuePressed(true);
    } else if (lesson.status === "not started") {
      handleStartLesson(lesson._id);
    }
  };

  const handleStartLesson = async (lessonId) => {
    await dispatch(startLesson(lessonId));
    setIsStartPressed(true);
  };

  const handleQuiz = () => {
    console.log("Quiz");
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

  const renderLessonStatusText = () => {
    if (lesson.status === "not started") {
      return (
        <Text style={styles.lessonDescription}>
          This lesson covers various vocabulary words and phrases related to{" "}
          {lesson.title}. After completing this lesson, you will be able to take
          the quiz to test your knowledge on this topic.
        </Text>
      );
    } else if (lesson.status === "completed") {
      return (
        <>
          <Text style={styles.boldText}>
            Congratulations on completing this lesson!
          </Text>
          <Text>Take the quiz to test your knowledge on this lesson.</Text>
        </>
      );
    } else if (lesson.status === "in progress") {
      return (
        <>
          <Text style={styles.boldText}>Continue learning this lesson.</Text>
          <Text style={styles.progressText}>
            So far, you have learned{" "}
            <Text style={styles.boldText}>{totalLearnedWords}</Text> words out
            of <Text style={styles.totalText}>{words.length}</Text> vocabulary
            words in this lesson.
          </Text>
        </>
      );
    } else {
      return (
        <Text style={styles.boldText}>
          Click the button below to start learning!
        </Text>
      );
    }
  };

  const renderButtons = () => {
    if (isStartingLesson || isWordsFetching) {
      return <ActivityIndicator color={colors.primary} size="large" />;
    } else {
      return (
        <>
          {lesson.status === "completed" && (
            <TouchableOpacity style={styles.quizButton} onPress={handleQuiz}>
              <Text style={styles.quizButtonText}>Start Quiz</Text>
              <MaterialIcons
                name="arrow-forward"
                size={24}
                color={colors.white}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.quizButton}
            onPress={handleNavigation}
          >
            <Text style={styles.quizButtonText}>
              {lesson.status === "in progress" && "Continue"}
              {lesson.status === "not started" && "Start"}
              {lesson.status === "completed" && "Continue Learning"}
            </Text>
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
        </>
      );
    }
  };

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

      <View>
        {renderLessonStatusText()}
        {renderButtons()}
      </View>
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
    color: "red",
    marginBottom: 10,
  },

  progressText: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  boldText: {
    fontWeight: "bold",
  },
  totalText: {
    fontWeight: "bold",
    color: "#888",
  },
});

export default LessonDetailsScreen;
