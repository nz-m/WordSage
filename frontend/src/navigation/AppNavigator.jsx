import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LessonListScreen from "../screens/LessonListScreen";
import LessonDetailsScreen from "../screens/LessonDetailsScreen";
import WordScreen from "../screens/WordScreen";
import WordOfTheDayScreen from "../screens/WordOfTheDayScreen";
import LevelUpTestScreen from "../screens/LevelUpTestScreen";
import LevelAssessmentPrompt from "../screens/LevelAssessmentPrompt";
import LevelAssessmentScreen from "../screens/LevelAssessmentScreen";
import LevelAssessmentResult from "../screens/LevelAssessmentResult";
import LoadingScreen from "../screens/LoadingScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { token, user } = useSelector((state) => state.auth);

  if (token === undefined || user === undefined) {
    return <LoadingScreen />;
  }
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
          {user && !user.isLevelAssessmentTaken ? (
            <Stack.Screen
              name="LevelAssessmentPrompt"
              component={LevelAssessmentPrompt}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="LessonList" component={LessonListScreen} />
          <Stack.Screen name="LessonDetails" component={LessonDetailsScreen} />
          <Stack.Screen name="Word" component={WordScreen} />
          <Stack.Screen name="WordOfTheDay" component={WordOfTheDayScreen} />
          <Stack.Screen
            name="LevelAssessmentResult"
            component={LevelAssessmentResult}
          />
          <Stack.Screen
            name="LevelAssessment"
            component={LevelAssessmentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LevelUpTest"
            component={LevelUpTestScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
