import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = {
    name: "Neaz",
    level: "Intermediate",
    dailyStreak: 3,
  };

  const handleLearningResourcePress = () => {
    navigation.navigate("LessonList");
  };

  const handleWordOfTheDayPress = () => {
    navigation.navigate("WordOfTheDay");
  };

  const handleLevelUpAssessmentPress = () => {
    navigation.navigate("LevelUpAssessment");
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
            style={styles.card}
            onPress={handleLearningResourcePress}
          >
            <Ionicons name="book" size={32} color="#147EFB" />
            <Text style={styles.cardTitle}>Continue Learning</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card2}
            onPress={handleWordOfTheDayPress}
          >
            <Ionicons name="calendar" size={32} color="#FF6A00" />
            <Text style={styles.cardTitle}>Word of the Day</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card3}
            onPress={handleLevelUpAssessmentPress}
          >
            <Ionicons name="trophy" size={32} color="#FFC400" />
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
    backgroundColor: "#FFF",
  },
  topSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  
  },
  userProfile: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 2,
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
    marginTop: 10,
    height: 50,
    width: 280,
    textAlign: "center",
  },
  levelText: {
    fontSize: 16,
    color: "#888",
    marginTop: -20,
    marginBottom: 10,
  },
  midSection: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    flex: 1,
    padding: 20,
    backgroundColor: "#8ab8ff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  card2: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffca8a",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  card3: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fae76e",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    height: 50,
    width: 250,
    marginBottom: -20,
  },
});

export default HomeScreen;
