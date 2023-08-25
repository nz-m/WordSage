import React, { useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchLessons } from "../../features/learn/learnThunks";

const LessonListScreen = ({ navigation }) => {
  const { lessons, isFetching } = useSelector((state) => state.learn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lessons || lessons.length === 0) {
      dispatch(fetchLessons());
    }
  }, []);

  if (isFetching || !lessons) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!lessons || lessons.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No lessons available.</Text>
      </View>
    );
  }

  const iconColors = {
    chat: "#2196F3", // Blue
    person: "#FF5722", // Orange
    home: "#4CAF50", // Green
    restaurant: "#E91E63", // Pink
    flight: "#FF9800", // Amber
    favorite: "#9C27B0", // Purple
    work: "#795548", // Brown
    school: "#3F51B5", // Indigo
    nature: "#8BC34A", // Light Green
    devices: "#607D8B", // Blue Grey
  };

  const handleLessonPress = (lesson) => {
    switch (lesson.status) {
      case "not started":
      case "completed":
      case "in progress":
        navigation.navigate("Lesson Information", { lesson });
        break;
      case "locked":
        alert("This lesson is locked. Complete previous lessons to unlock.");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {lessons?.map((lesson) => (
        <TouchableOpacity
          key={lesson.lessonNumber}
          style={styles.lessonItem}
          onPress={() => handleLessonPress(lesson)}
        >
          <MaterialIcons
            name={lesson.icon}
            size={24}
            color={iconColors[lesson.icon]}
            style={styles.lessonIcon}
          />
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          {lesson.status === "completed" ? (
            <MaterialIcons name="check" size={24} color="green" />
          ) : lesson.status === "in progress" ? (
            <MaterialIcons name="timer" size={24} color="orange" />
          ) : lesson.status === "locked" ? (
            <MaterialIcons name="lock" size={24} color="black" />
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },

  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  lessonIcon: {
    marginRight: 10,
  },
  lessonTitle: {
    fontSize: 18,
    flex: 1,
    color: "#333333",
  },
  completedIcon: {
    marginRight: 5,
    color: "#4CAF50",
  },
  lockedIcon: {
    marginRight: 5,
    color: "#F44336",
  },
});

export default LessonListScreen;
