import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import colors from "../constants/colors";
import {
  markLessonAsCompleted,
  markWordAsLearned,
} from "../features/learn/learnThunks";
import { updateWords } from "../features/learn/learnSlice";
import { useDispatch } from "react-redux";

const WordScreen = ({
  route: {
    params: { words, lessonId, lessonNumber },
  },
}) => {
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordData, setWordData] = useState(words[currentIndex]);
  const [wordStatus, setWordStatus] = useState(
    words.map((word) => ({ _id: word._id, isDone: word.isLearned }))
  );

  // Keep track of the count of completed words
  const [completedWords, setCompletedWords] = useState(
    words.filter((word) => word.isLearned).length
  );

  const totalWords = words.length;

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

    setCompletedWords((prevCompletedWords) => prevCompletedWords + 1);

    setWordStatus(updatedStatus);

    const markAsLearnedPayload = {
      wordId: wordData._id,
      lessonTitle: wordData.lessonTitle,
      level: wordData.level,
      isLearned: true,
    };

    const updateWordsPayload = {
      wordId: wordData._id,
    };

    dispatch(markWordAsLearned(markAsLearnedPayload));
    dispatch(updateWords(updateWordsPayload));

    if (completedWords + 1 === totalWords) {
      setShowCongratsModal(true);
      dispatch(markLessonAsCompleted({ lessonId, lessonNumber }));
    }

    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        handleNextPress();
      }
    }, 500);
  };

  const isDone = wordStatus.find((word) => word._id === wordData._id)?.isDone;
  const [showCongratsModal, setShowCongratsModal] = useState(false);

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
        {wordData.partOfSpeech ? (
          <Text style={styles.description}>{wordData.partOfSpeech}</Text>
        ) : (
          <Text style={styles.description}>N/A</Text>
        )}
      </View>

      <View style={styles.section}>
        <MaterialCommunityIcons name="book" size={24} color="#888" />
        <Text style={styles.title}>Meaning:</Text>
        <Text style={styles.description}>{wordData.meaning}</Text>
      </View>

      {wordData.synonym && (
        <View style={styles.section}>
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={24}
            color="#888"
          />
          <Text style={styles.title}>Synonym:</Text>
          <Text style={styles.description}>{wordData.synonym}</Text>
        </View>
      )}

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

      <Modal
        animationType="slide"
        transparent={true}
        visible={showCongratsModal}
        onRequestClose={() => setShowCongratsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.congratsText}>
              Congratulations on completing the lesson!
            </Text>
            <Text style={styles.congratsText}>
              You have learned {completedWords} out of {totalWords} words.
            </Text>
            <Text style={styles.congratsText}>Keep up the good work!</Text>

            <Text style={styles.congratsText}>
              The next is unlocked for you! You can start the next lesson now.
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowCongratsModal(false)}
            >
              <Text style={styles.modalButtonText}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },

  congratsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },

  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },

  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default WordScreen;
