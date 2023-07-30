import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../themes/colors";
import { useNavigation } from "@react-navigation/native";

const LessonDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { lesson } = route.params;

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
          <Text style={{ marginBottom: 20 }}>
            Take the quiz to test your knowledge on this topic.
          </Text>
        </View>
      ) : (
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          Click the button below to start learning!
        </Text>
      )}

      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => {
          if (lesson.status === "complete") {
            navigation.navigate("Quiz", { lesson });
          } else {
            navigation.navigate("WordScreen");
          }
        }}
      >
        <Text style={styles.quizButtonText}>
          {lesson.status === "complete" ? "Start Quiz" : "Start Lesson"}
        </Text>
        <MaterialIcons name="arrow-forward" size={24} color={colors.white} />
      </TouchableOpacity>
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
});

export default LessonDetailsScreen;
