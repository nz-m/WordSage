import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ProficiencyTestMessage from "../screens/ProficiencyTestMessage";
import QuizScreen from "../screens/QuizScreen";
import FinishScreen from "../screens/FinishScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name="ProficiencyTestMessage"
        component={ProficiencyTestMessage}
      />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Finish" component={FinishScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
