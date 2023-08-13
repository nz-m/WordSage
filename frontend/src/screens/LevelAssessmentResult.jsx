import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import colors from "../themes/colors";
import { updateLevelAssessmentStatus } from "../features/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";

const LevelAssessmentResult = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user, levelAssessmentLoading, levelAssessmentError } = useSelector(
    (state) => state.auth
  );

  const { score } = route.params;

  const [userlevel, setUserlevel] = useState("");

  useEffect(() => {
    let level = "";
    if (score >= 3) {
      level = "Advanced";
    } else if (score >= 2) {
      level = "Intermediate";
    } else {
      level = "Beginner";
    }
    setUserlevel(level);
  }, [score]);

  const handleFinish = async () => {
    await dispatch(
      updateLevelAssessmentStatus({
        userId: user._id,
        levelAssessmentStatus: true,
      })
    );
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.resultText}>Your Score: {score}/3</Text>
      <Text style={styles.levelText}>
        Based on your score, your English vocabulary level is: {userlevel}
      </Text>
      {levelAssessmentLoading ? (
        <ActivityIndicator size="large" color={colors.primaryText} />
      ) : (
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      )}
      {levelAssessmentError && (
        <Text style={styles.errorText}>Error: {levelAssessmentError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.primaryBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    color: colors.primaryText,
    marginBottom: 20,
  },
  levelText: {
    fontSize: 18,
    color: colors.primaryText,
    marginBottom: 40,
  },
  finishButton: {
    width: 200,
    height: 50,
    backgroundColor: "#3988FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  finishButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
});

export default LevelAssessmentResult;
