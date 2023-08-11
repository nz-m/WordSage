import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import store from "./src/features/store";
import { getAuthToken } from "./src/helpers/tokenStorage";
import { getUserInfo } from "./src/helpers/userInfoStorage";
import { setCredentials } from "./src/features/auth/authSlice";

const App = () => {
  useEffect(() => {
    const initializeStore = async () => {
      try {
        const authToken = await getAuthToken();
        const userInfo = await getUserInfo();

        if (authToken) {
          store.dispatch(setCredentials(authToken, userInfo));
        }
      } catch (error) {
        store.dispatch(setCredentials(null, null));
      }
    };

    initializeStore();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
