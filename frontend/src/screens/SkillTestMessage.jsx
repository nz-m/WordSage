import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../themes/colors";
import { useNavigation } from "@react-navigation/native";

const SkillTestMessage = () => {
  const navigation = useNavigation();

  const handleStartTest = () => {
    navigation.navigate("Quiz");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, User!</Text>
      <Text style={styles.welcomeMessage}>Welcome to WordSage</Text>
      <Text style={styles.subtitle}>Your Personal Vocabulary Tutor</Text>
      <Text style={styles.description}>
        We're excited to have you on board! Before we begin, let's assess your
        English vocabulary level. The proficiency test will help us understand
        your current knowledge and tailor a personalized learning experience
        just for you.
      </Text>
      <TouchableOpacity style={styles.startButton} onPress={handleStartTest}>
        <Text style={styles.buttonText}>Start Test</Text>
      </TouchableOpacity>
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
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 10,
  },
  welcomeMessage: {
    fontSize: 24,
    color: colors.primaryText,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.secondaryText,
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: colors.secondaryText,
  },
  startButton: {
    width: 200,
    height: 50,
    backgroundColor: "#3988FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SkillTestMessage;
