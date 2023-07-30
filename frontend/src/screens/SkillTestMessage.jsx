import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../themes/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

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
      <View style={styles.container2}>
        <View style={styles.quizDetails}>
          <Ionicons name="time" size={30} color="#2ba3e3" />
          <Text style={styles.detailsText}>Time allowed</Text>
          <Text style={styles.detailsTextSub}>10 mins</Text>
        </View>
        <View style={styles.quizDetails}>
          <AntDesign name="questioncircle" size={27} color="#e32b2b" />
          <Text style={styles.detailsText}>Total no of questions</Text>
          <Text style={styles.detailsTextSub}>03</Text>
        </View>
        <View style={styles.quizDetails}>
          <AntDesign name="caretright" size={27} color="#2be356" />
          <Text style={styles.detailsText}>Total marks</Text>
          <Text style={styles.detailsTextSub}>15</Text>
        </View>
      </View>
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
    paddingHorizontal: 0,
    backgroundColor: colors.primaryBackground,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 0,
  },
  welcomeMessage: {
    fontSize: 24,
    color: colors.primaryText,
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 18,
    color: colors.secondaryText,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
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
  container2: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 7,
    marginBottom: 20,
  },
  quizDetails: {
    backgroundColor: "#e8e8e8",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  detailsText: {
    color: "gray",
    fontSize: 17,
  },
  detailsTextSub: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SkillTestMessage;
