import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import colors from "../themes/colors";
import { Feather } from "@expo/vector-icons";
import { logoutUser } from "../features/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const userData = {
    name: user.name,
    profilePicture: require("../assets/profile.png"),
    level: user.level,
    streak: 10,
    lessonsCompleted: "25/50",
    practiceQuizResults: {
      highestScore: 90,
      averageScore: 75,
    },
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
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

        <View style={styles.statCard2}>
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
        <View style={styles.statCard3}>
          <Feather name="check-circle" size={24} color={colors.primaryColor} />
          <Text style={styles.statTitle}>Words Learnt</Text>
          <Text style={styles.statValue}>100</Text>
        </View>
        <View style={styles.statCard4}>
          <Feather name="clock" size={24} color={colors.primaryColor} />
          <Text style={styles.statTitle}>Longest Streak (Days)</Text>
          <Text style={styles.statValue}>{userData.streak}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Image
          source={require("../assets/logout.png")}
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
    backgroundColor: "#8ac926",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 5,
  },
  statCard2: {
    flex: 1,
    backgroundColor: "#ffca3a",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 5,
  },
  statCard3: {
    flex: 1,
    backgroundColor: "#73d2de",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 5,
  },
  statCard4: {
    flex: 1,
    backgroundColor: "#ff595e",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 5,
  },
  statTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.primaryColor,
    textDecorationLine: "underline",
  },
  statValue: {
    fontSize: 14,
    color: "gray",
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
