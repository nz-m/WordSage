import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const LessonListScreen = ({ navigation }) => {
  const lessons = [
    {
      id: 1,
      title: "Everyday Conversations",
      icon: "chat",
      status: "not started",
    },
    {
      id: 2,
      title: "Personal Information",
      icon: "person",
      status: "complete",
    },
    { id: 3, title: "Home and Living", icon: "home", status: "complete" },
    { id: 4, title: "Food and Dining", icon: "restaurant", status: "complete" },
    {
      id: 5,
      title: "Travel and Transportation",
      icon: "flight",
      status: "complete",
    },
    {
      id: 6,
      title: "Health and Wellness",
      icon: "favorite",
      status: "ongoing",
    },
    { id: 7, title: "Work and Careers", icon: "work", status: "locked" },
    {
      id: 8,
      title: "Education and Learning",
      icon: "school",
      status: "locked",
    },
    {
      id: 9,
      title: "Nature and Environment",
      icon: "nature",
      status: "locked",
    },
    {
      id: 10,
      title: "Technology and Communication",
      icon: "devices",
      status: "locked",
    },
  ];

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
    if (lesson.status === "not started" || lesson.status === "complete") {
      // Navigate to the lesson screen for completed/ongoing lessons
      navigation.navigate("LessonScreen", { lesson });
    } else if (lesson.status === "ongoing") {
      navigation.navigate("Quiz", { lesson });
    } else if (lesson.status === "locked") {
      alert("This lesson is locked. Complete previous lessons to unlock.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vocabulary Lessons</Text>
      {lessons.map((lesson) => (
        <TouchableOpacity
          key={lesson.id}
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
          {lesson.status === "complete" ? (
            <MaterialIcons name="check" size={24} color="green" />
          ) : lesson.status === "ongoing" ? (
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
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
