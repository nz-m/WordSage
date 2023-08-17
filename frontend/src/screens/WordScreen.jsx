import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import colors from "../themes/colors";
// import words from "../data/words";

const WordScreen = ({ route }) => {
  const { words } = route.params;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordData, setWordData] = useState(words[currentIndex]);
  const [wordStatus, setWordStatus] = useState(
    words.map((word) => ({ _id: word._id, isDone: false }))
  );

  const handlePronunciationPress = (word) => {
    Speech.speak(word);
  };

  const handleNextPress = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setWordData(words[currentIndex + 1]);
  };

  const handlePreviousPress = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setWordData(words[currentIndex - 1]);
  };

  const handleDonePress = () => {
    const updatedStatus = wordStatus.map((word) =>
      word._id === wordData._id ? { ...word, isDone: true } : word
    );
    setWordStatus(updatedStatus);
  };

  const isDone = wordStatus.find((word) => word._id === wordData._id)?.isDone;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePreviousPress}
          disabled={currentIndex === 0}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.wordCount}>{`${currentIndex + 1}/${
          words.length
        }`}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNextPress}
          disabled={currentIndex === words.length - 1}
        >
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.word}>
        {wordData.word.charAt(0).toUpperCase() + wordData.word.slice(1)}
      </Text>

      <TouchableOpacity onPress={() => handlePronunciationPress(wordData.word)}>
        <MaterialCommunityIcons
          name="volume-high"
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>

      <View style={styles.section}>
        <MaterialCommunityIcons name="book" size={24} color="#888" />
        <Text style={styles.title}>Part of Speech:</Text>
        <Text style={styles.description}>{wordData.partOfSpeech}</Text>
      </View>

      <View style={styles.section}>
        <MaterialCommunityIcons name="book" size={24} color="#888" />
        <Text style={styles.title}>Meaning:</Text>
        <Text style={styles.description}>{wordData.meaning}</Text>
      </View>

      <View style={styles.section}>
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={24}
          color="#888"
        />
        <Text style={styles.title}>Synonym:</Text>
        <Text style={styles.description}>{wordData.synonym}</Text>
      </View>

      <View style={styles.section}>
        <MaterialCommunityIcons
          name="comment-question-outline"
          size={24}
          color="#888"
        />
        <Text style={styles.title}>Usage:</Text>
        <Text style={styles.description}>{wordData.example}</Text>
      </View>

      {!isDone ? (
        <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
          <Text style={styles.doneButtonText}>Mark as Done</Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ color: colors.primary }}>Word marked as done!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
  },
  wordCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.darkGray,
  },
  word: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 30,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginLeft: 30,
    color: "#888",
  },
  doneButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 20,
  },
  doneButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default WordScreen;
