import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../themes/colors";
import { Feather } from "@expo/vector-icons";

const ProfileScreen = () => {
  const userData = {
    name: "Neaz Mahmud",
    profilePicture: require("../assets/user.png"),
    level: "Intermediate",
    streak: 10,
    lessonsCompleted: "25/50",
    practiceQuizResults: {
      highestScore: 90,
      averageScore: 75,
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={userData.profilePicture} style={styles.profileImage} />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.levelText}>Level: {userData.level}</Text>
      </View>

      <View style={styles.statContainer}>
        <View style={styles.statCard}>
          <Feather name="book" size={24} color={colors.primaryColor} />
          <Text style={styles.statTitle}>Lessons Completed</Text>
          <Text style={styles.statValue}>{userData.lessonsCompleted}</Text>
        </View>

        <View style={styles.statCard}>
          <Feather name="bar-chart-2" size={24} color={colors.primaryColor} />
          <Text style={styles.statTitle}>Practice Quiz</Text>
          <Text style={styles.statValue}>
            Highest Score: {userData.practiceQuizResults.highestScore}
          </Text>
          <Text style={styles.statValue}>
            Average Score: {userData.practiceQuizResults.averageScore}
          </Text>
        </View>
      </View>

      {/* Additional Statistics */}
      <View style={styles.statContainer}>
        <View style={styles.statCard}>
          <Feather name="check-circle" size={24} color={colors.primaryColor} />
          <Text style={styles.statTitle}>Words Learnt</Text>
          <Text style={styles.statValue}>100</Text>
        </View>
        <View style={styles.statCard}>
          <Feather name="clock" size={24} color={colors.primaryColor} />
          <Text style={styles.statTitle}>Longest Streak (Days)</Text>
          <Text style={styles.statValue}>{userData.streak}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  levelText: {
    fontSize: 18,
    color: "gray",
    marginBottom: 10,
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  statTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.primaryColor,
  },
  statValue: {
    fontSize: 16,
    color: colors.darkGray,
  },
  logoutButton: {
    backgroundColor: colors.accentColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
  },
  logoutButtonText: {
    fontSize: 16,
    color: colors.White,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
