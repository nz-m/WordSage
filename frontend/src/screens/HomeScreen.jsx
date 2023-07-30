import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Screen from "../components/Screen";
const HomeScreen = () => {
  const user = {
    name: "Neaz",
    rank: "Intermediate",
  };

  const handleLearningResourcePress = () => {};

  const handleWordOfTheDayPress = () => {};

  const handleThemeLearningPress = () => {};

  return (
    <Screen>
      <View style={styles.container}>
        {/* Top Section - User Profile */}
        <View style={styles.topSection}>
          <View style={styles.userProfile}>
            <Image
              source={require("../assets/user.png")}
              style={styles.profileImage}
            />
            <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
            <Text style={styles.rankText}>Rank: {user.rank}</Text>
          </View>
        </View>

        {/* Middle Section - Learning Resource and Word of the Day */}
        <View style={styles.midSection}>
          <TouchableOpacity
            style={styles.card}
            onPress={handleLearningResourcePress}
          >
            <Text style={styles.cardTitle}>Continue Learning</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={handleWordOfTheDayPress}
          >
            <Text style={styles.cardTitle}>Word of the Day</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Section - Themed Learning */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.themeCard, styles.technologyTheme]}
            onPress={() => handleThemeLearningPress("Technology")}
          >
            <Text style={styles.themeCardTitle}>Technology</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.themeCard, styles.businessTheme]}
            onPress={() => handleThemeLearningPress("Business")}
          >
            <Text style={styles.themeCardTitle}>Business</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.themeCard, styles.politicsTheme]}
            onPress={() => handleThemeLearningPress("Politics")}
          >
            <Text style={styles.themeCardTitle}>Politics</Text>
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
    backgroundColor: "#f0f0f0",
  },
  profileBox: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  profileImage: {
    width: 24,
    height: 25,
    borderRadius: 50,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rankText: {
    fontSize: 16,
    color: "#888",
  },
  midSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  card: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bottomSection: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 20,
  },
  themeCard: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  themeCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  technologyTheme: {
    backgroundColor: "#4caf50",
  },
  businessTheme: {
    backgroundColor: "#2196f3",
  },
  politicsTheme: {
    backgroundColor: "#f44336",
  },
});

export default HomeScreen;
