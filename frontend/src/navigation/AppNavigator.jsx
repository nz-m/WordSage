import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import SkillTestMessage from "../screens/SkillTestMessage";
import QuizScreen from "../screens/QuizScreen";
import TestResult from "../screens/TestResult";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LessonListScreen from "../screens/LessonListScreen";
import LessonDetailsScreen from "../screens/LessonDetailsScreen";
import WordScreen from "../screens/WordScreen";
import WordOfTheDayScreen from "../screens/WordOfTheDayScreen";
import LevelUpAssessmentScreen from "../screens/LevelUpAssessmentScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="SkillTestMessage" component={SkillTestMessage} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Result" component={TestResult} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="LessonList" component={LessonListScreen} />
      <Stack.Screen name="LessonScreen" component={LessonDetailsScreen} />
      <Stack.Screen name="WordScreen" component={WordScreen} />
      <Stack.Screen name="WordOfTheDay" component={WordOfTheDayScreen} />
      <Stack.Screen
        name="LevelUpAssessment"
        component={LevelUpAssessmentScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
