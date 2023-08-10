import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
// import AuthNavigator from "./src/navigation/AuthNavigator"; // Import your authentication navigation
import { getAuthToken } from "./src/helpers/tokenHelper"; // Import the getAuthToken function

const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  //
  // useEffect(() => {
  //   // Check if the authentication token is present
  //   getAuthToken()
  //     .then((token) => {
  //       if (token) {
  //         setIsAuthenticated(true);
  //       }
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);
  //
  // if (isLoading) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
