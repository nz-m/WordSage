import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import LottieView from "lottie-react-native";

const LevelAssessmentResult = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const { correctCounts, level, scorePercentage } = useSelector(
    (state) => state.levelAssessment
  );

  const [modalVisible, setModalVisible] = useState(false);

  const handleFinish = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.congratsText}>Congratulations, {user.name}!</Text>
      <Text style={styles.resultText}>Your Vocabulary Proficiency Level:</Text>
      <Text style={styles.levelText}>{level}</Text>
      {/* Lottie Animation */}
      <LottieView
        source={require("../assets/celebration.json")}
        autoPlay
        loop={true}
        style={styles.lottieAnimation}
      />
      <Text style={styles.scoreText}>Your Score: {scorePercentage}%</Text>

      <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.detailsButtonText}>
          How was my score calculated?
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Assessment Details</Text>

            <Text style={styles.modalSubtitle}>
              Your correct answers in each level:
            </Text>
            {Object.entries(correctCounts).map(([level, count]) => (
              <Text key={level} style={styles.levelScore}>
                {level}: {count} correct answer{count !== 1 ? "s" : ""}
              </Text>
            ))}

            <Text style={styles.modalSubtitle}>Score Calculation:</Text>
            <Text style={styles.modalText}>
              Your total score was calculated by summing the points from all the
              correct answers in each level:
            </Text>
            <Text style={styles.modalText}>
              BEGINNER: 1 point | INTERMEDIATE: 2 points | ADVANCED: 3 points
            </Text>

            <TouchableOpacity
              style={styles.finishButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.finishButtonText}>Close</Text>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  scoreText: {
    fontSize: 16,
    marginBottom: 20,
  },
  detailsButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  detailsButtonText: {
    color: "white",
    fontWeight: "bold",
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
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  finishButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  finishButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  scoreExplanation: {
    fontSize: 14,
    marginTop: 20,
    color: "#333",
    textAlign: "center",
  },

  modalSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  levelScore: {
    fontSize: 14,
    marginBottom: 5,
  },
  levelText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2ecc71",
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  lottieAnimation: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default LevelAssessmentResult;
