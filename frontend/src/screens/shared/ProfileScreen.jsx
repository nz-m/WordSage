import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import colors from "../../constants/colors";
import LoadingScreen from "./LoadingScreen";
import logOut from "../../features/rootAction";
import { fetchUserStats } from "../../features/profile/profileThunks";
import { resetStats } from "../../features/profile/profileSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { stats } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchUserStats());
    } else {
      dispatch(resetStats());
    }
  }, [isFocused]);

  if (!user || !stats) {
    return <LoadingScreen />;
  }

  const userData = {
    name: user.name,
    profilePicture: require("../../assets/profile.png"),
    level: user.level,
    lessonsCompleted: stats.totalLessonsCompleted,
    practiceQuizResults: {
      highestScore: stats.quizHighestScore,
      averageScore: stats.quizAverageScore,
    },
    longestStreak: stats.longestStreak,
    currentStreak: stats.currentStreak,
    totalWordsLearned: stats.totalWordsLearned,
    totalQuizzesCompleted: stats.totalQuizzesCompleted,
  };

  const renderStatCard = (iconName, title, value, bgColor) => (
    <View style={[styles.statCard, { backgroundColor: bgColor }]}>
      <Feather name={iconName} size={24} color={colors.primaryColor} />
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={userData.profilePicture} style={styles.profileImage} />
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.levelText}>Level: {userData.level}</Text>
      </View>

      <View style={styles.statContainer}>
        {renderStatCard(
          "book",
          "Lessons Completed",
          userData.lessonsCompleted,
          "#8ac926"
        )}
        {renderStatCard(
          "bar-chart-2",
          "Practice Quiz",
          `Quiz Taken: ${userData.totalQuizzesCompleted}\nHighest Score: ${userData.practiceQuizResults.highestScore}\nAverage Score: ${userData.practiceQuizResults.averageScore}`,
          "#ffca3a"
        )}
      </View>

      <View style={styles.statContainer}>
        {renderStatCard(
          "check-circle",
          "Words Learnt",
          userData.totalWordsLearned,
          "#73d2de"
        )}
        {renderStatCard(
          "clock",
          "Streaks (Days)",
          `Longest: ${userData.longestStreak}\nCurrent: ${userData.currentStreak}`,
          "#ff595e"
        )}
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => dispatch(logOut())}
      >
        <Image
          source={require("../../assets/logout.png")}
          style={styles.logoutImage}
        />
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
    color: colors.white,
    marginBottom: 10,
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 5,
  },
  statTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.white,
    textDecorationLine: "underline",
  },
  statValue: {
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#E3E3E3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "center",
    height: 45,
    width: 120,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 7,
    color: "#E04F5F",
  },
  logoutImage: {
    width: 25,
    height: 25,
  },
});

export default ProfileScreen;
