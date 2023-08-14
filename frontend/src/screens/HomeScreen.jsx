import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import colors from "../themes/colors";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <LoadingScreen />;
  }

  const handleLearningResourcePress = () => {
    navigation.navigate("LessonList");
  };

  const handleWordOfTheDayPress = () => {
    navigation.navigate("WordOfTheDay");
  };

  const handleLevelUpAssessmentPress = () => {
    navigation.navigate("LevelUpTest");
  };

  return (
    <Screen>
      <View style={styles.container}>
        {/* Top Section - User Profile */}
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.userProfile}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={require("../assets/profile.png")}
              style={styles.profileImage}
            />
            <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
            <Text style={styles.levelText}>Level: {user.level}</Text>
          </TouchableOpacity>
        </View>

        {/* Middle Section - Learning Resource, Word of the Day, Level-up Assessment */}
        <View style={styles.midSection}>
          <TouchableOpacity
            style={[styles.card, styles.continueLearningCard]}
            onPress={handleLearningResourcePress}
          >
            <Ionicons name="book" size={32} color="#FFF" />
            <Text style={styles.cardTitle}>Continue Learning</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.wordOfTheDayCard]}
            onPress={handleWordOfTheDayPress}
          >
            <Ionicons name="calendar" size={32} color="#FFF" />
            <Text style={styles.cardTitle}>Word of the Day</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.levelUpAssessmentCard]}
            onPress={handleLevelUpAssessmentPress}
          >
            <Ionicons name="trophy" size={32} color="#FFF" />
            <Text style={styles.cardTitle}>Level-up Assessment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary,
  },
  topSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  userProfile: {
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    backgroundColor: colors.almond,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "center",
  },
  levelText: {
    fontSize: 16,
    color: colors.black,
  },
  midSection: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#FFF",
  },

  continueLearningCard: {
    backgroundColor: "#69C9FF",
  },
  wordOfTheDayCard: {
    backgroundColor: "#FF6A88",
  },
  levelUpAssessmentCard: {
    backgroundColor: "#FFB56A",
  },
});

export default HomeScreen;
