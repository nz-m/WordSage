import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LessonListScreen from "../screens/LessonListScreen";
import LessonDetailsScreen from "../screens/LessonDetailsScreen";
import WordScreen from "../screens/WordScreen";
import WordOfTheDayScreen from "../screens/WordOfTheDayScreen";
import LevelUpAssessmentScreen from "../screens/LevelUpAssessmentScreen";
import SkillTestMessage from "../screens/SkillTestMessage";
import QuizScreen from "../screens/QuizScreen";
import TestResult from "../screens/TestResult";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator>
      {!token ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="LessonList" component={LessonListScreen} />
          <Stack.Screen name="LessonDetails" component={LessonDetailsScreen} />
          <Stack.Screen name="Word" component={WordScreen} />
          <Stack.Screen name="WordOfTheDay" component={WordOfTheDayScreen} />
          <Stack.Screen
            name="LevelUpAssessment"
            component={LevelUpAssessmentScreen}
          />
          <Stack.Screen
            name="SkillTestMessage"
            component={SkillTestMessage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TestResult"
            component={TestResult}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
