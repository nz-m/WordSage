import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const WordOfTheDayScreen = () => {
  const navigation = useNavigation();

  const wordOfTheDay = {
    word: "Serendipity",
    synonym: "Fortuity",
    meaning: "The occurrence of events by chance in a happy or beneficial way.",
    usage:
      "I experienced serendipity when I found my long-lost friend at the airport.",
  };

  handleDonePress = () => {
    navigation.navigate("Home");
  };

  const handlePronunciationPress = (word) => {
    Speech.speak(word);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Word of the Day</Text>
      <View style={styles.wordCard}>
        <Text style={styles.word}>{wordOfTheDay.word}</Text>
        <TouchableOpacity
          onPress={() => handlePronunciationPress(wordOfTheDay.word)}
        >
          <MaterialCommunityIcons
            name="volume-high"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        <Text style={styles.synonym}>{wordOfTheDay.synonym}</Text>
        <Text style={styles.meaning}>{wordOfTheDay.meaning}</Text>
        <Text style={styles.usage}>{wordOfTheDay.usage}</Text>
      </View>
      <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  wordCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  word: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  synonym: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  meaning: {
    fontSize: 18,
    marginBottom: 10,
  },
  usage: {
    fontSize: 16,
    fontStyle: "italic",
  },
  doneButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
  },
  doneText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
});

export default WordOfTheDayScreen;
