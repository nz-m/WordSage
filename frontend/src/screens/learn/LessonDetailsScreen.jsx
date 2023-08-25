import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getWords, startLesson } from "../../features/learn/learnThunks";
import { getQuiz, getQuizStatus } from "../../features/quiz/quizThunks";
import { clearQuizErrors } from "../../features/quiz/quizSlice";
import LoadingScreen from "../shared/LoadingScreen";

const LessonDetailsScreen = ({
  route: {
    params: { lesson },
  },
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    isQuizStatusFetching,
    quizStatusFetchingError,
    isQuizTaken,
    isQuizFetching,
    quiz,
    quizFetchingError,
  } = useSelector((state) => state.quiz);
  const {
    isStartingLesson,
    startingLessonError,
    isWordsFetching,
    wordsFetchingError,
    words,
  } = useSelector((state) => state.learn);
  const { user } = useSelector((state) => state.auth);

  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const [isStartPressed, setIsStartPressed] = useState(false);
  const [isTakeQuizPressed, setIsTakeQuizPressed] = useState(false);
  const [isErrorClearPressed, setIsErrorClearPressed] = useState(false);

  useEffect(() => {
    if (lesson) {
      dispatch(getQuizStatus({ lessonTitle: lesson.title }));
    }

    return () => {
      dispatch(clearQuizErrors());
    };
  }, [isQuizTaken, navigation]);

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

  const handleQuiz = async () => {
    if (isQuizTaken) {
      navigation.navigate("QuizResult", { lessonTitle: lesson.title });
    }

    await dispatch(getQuiz({ level: user.level, lessonTitle: lesson.title }));
    setIsTakeQuizPressed(true);
  };

  useEffect(() => {
    if (
      isTakeQuizPressed &&
      !isQuizFetching &&
      !quizFetchingError &&
      !isErrorClearPressed &&
      quiz
    ) {
      navigation.navigate("QuizPrompt");
    }

    return () => {
      setIsErrorClearPressed(false);
    };
  }, [isTakeQuizPressed, isQuizFetching, quizFetchingError, quiz, navigation]);

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

  const handleClearError = () => {
    dispatch(clearQuizErrors());
    setIsErrorClearPressed(true);
  };

  if (isQuizStatusFetching) {
    return <LoadingScreen />;
  }

  const renderLessonStatusText = () => {
    if (lesson.status === "not started") {
      return (
        <Text style={styles.lessonDescription}>
          This lesson covers various vocabulary words and phrases related to{" "}
          {lesson.title}. After completing this lesson, you will be able to take
          the quiz to test your knowledge on this topic.
        </Text>
      );
    } else if (lesson.status === "completed" && user.level !== "Expert") {
      return (
        <>
          <Text style={styles.boldText}>
            Congratulations on completing this lesson!
          </Text>
          {isQuizTaken ? (
            <Text style={styles.progressText}>
              You have already taken the quiz for this lesson. Click the button
              below to see your quiz result.
            </Text>
          ) : (
            <Text>Take the quiz to test your knowledge on this lesson.</Text>
          )}
        </>
      );
    } else if (lesson.status === "in progress") {
      return (
        <Text style={styles.boldText}>Continue learning this lesson.</Text>
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
    if (isStartingLesson || isWordsFetching || isQuizFetching) {
      return <ActivityIndicator color={colors.primary} size="large" />;
    } else {
      return (
        <>
          {lesson.status === "completed" && user.level !== "Expert" && (
            <TouchableOpacity style={styles.quizButton} onPress={handleQuiz}>
              {!isQuizTaken ? (
                <>
                  <Text style={styles.quizButtonText}>Take Quiz</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={24}
                    color={colors.white}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.quizButtonText}>See Quiz Result</Text>
                  <MaterialIcons
                    name="arrow-forward"
                    size={24}
                    color={colors.white}
                  />
                </>
              )}
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
      quizStatusFetchingError ||
      quizFetchingError ||
      wordsFetchingError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>
            {startingLessonError ||
              wordsFetchingError ||
              quizStatusFetchingError ||
              quizFetchingError}
          </Text>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearError}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      ) : null}

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
    marginTop: 20,
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
  errorContainer: {
    backgroundColor: "#ffebeb",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  clearButtonText: {
    color: "#333",
    fontWeight: "bold",
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
  centeredButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LessonDetailsScreen;
