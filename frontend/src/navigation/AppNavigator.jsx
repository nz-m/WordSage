import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegistrationScreen from "../screens/auth/RegistrationScreen";
import HomeScreen from "../screens/shared/HomeScreen";
import ProfileScreen from "../screens/shared/ProfileScreen";
import LessonListScreen from "../screens/learn/LessonListScreen";
import LessonDetailsScreen from "../screens/learn/LessonDetailsScreen";
import WordScreen from "../screens/learn/WordScreen";
import WordOfTheDayScreen from "../screens/shared/WordOfTheDayScreen";
import LevelUpTestScreen from "../screens/levelUp-test/LevelUpTestScreen";
import LevelAssessmentPrompt from "../screens/level-assessment/LevelAssessmentPrompt";
import LevelAssessmentScreen from "../screens/level-assessment/LevelAssessmentScreen";
import LevelAssessmentResult from "../screens/level-assessment/LevelAssessmentResult";
import LoadingScreen from "../screens/shared/LoadingScreen";
import StartLearningPrompt from "../screens/learn/StartLearningPrompt";
import QuizScreen from "../screens/quiz/QuizScreen";
import QuizPromptScreen from "../screens/quiz/QuizPromptScreen";
import QuizResultScreen from "../screens/quiz/QuizResultScreen";
import { useSelector } from "react-redux";
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
          {user && !user.isLevelAssessed ? (
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
          <Stack.Screen
            name="StartLearningPrompt"
            component={StartLearningPrompt}
          />
          <Stack.Screen name="LessonList" component={LessonListScreen} />
          <Stack.Screen name="LessonDetails" component={LessonDetailsScreen} />
          <Stack.Screen name="Word" component={WordScreen} />
          <Stack.Screen name="WordOfTheDay" component={WordOfTheDayScreen} />
          <Stack.Screen
            name="LevelAssessmentResult"
            component={LevelAssessmentResult}
            options={{ headerShown: false }}
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

          <Stack.Screen
            name="QuizPrompt"
            component={QuizPromptScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Quiz"
            component={QuizScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="QuizResult"
            component={QuizResultScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
