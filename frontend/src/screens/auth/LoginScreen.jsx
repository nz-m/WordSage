import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunks";
import { getAuthToken } from "../../helpers/tokenStorage";
import { getUserInfo } from "../../helpers/userInfoStorage";
import { clearError } from "../../features/auth/authSlice";

const LoginScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const [callhandleLogin, setCallhandleLogin] = useState(false);

  useEffect(() => {
    if (callhandleLogin) handleLogin();
  }, [callhandleLogin]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAuthToken();
        const userInfo = await getUserInfo();
        setToken(token);
        setUserInfo(userInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleRegistrationPress = () => {
    navigation.navigate("Registration");
  };

  const handleExistingLogin = () => {
    setEmail(userInfo.email);
    setPassword(userInfo.password);
    setCallhandleLogin(true);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginError, loading } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    await dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (loginError) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [loginError]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("../../assets/undraw-adventure-map-hnin-21.png")}
      />
      <Text style={styles.title}>Welcome to WordSage</Text>
      <Text style={styles.subTitle}>
        Please login to your account to continue
      </Text>

      {loginError && (
        <View style={styles.messageContainer}>
          <View style={styles.errorContainer}>
            {typeof loginError === "string" ? (
              <Text style={styles.errorMessage}>{loginError}</Text>
            ) : (
              loginError.map((error, index) => (
                <Text key={index} style={styles.errorMessage}>
                  {error}
                </Text>
              ))
            )}
          </View>
        </View>
      )}

      <View style={styles.SectionStyle}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          required
        />
        <Image
          source={require("../../assets/mail.png")}
          style={styles.ImageStyle}
        />
      </View>

      <View style={styles.SectionStyle}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Image
          source={require("../../assets/lock.png")}
          style={styles.ImageStyle}
        />
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {token && userInfo ? (
        <TouchableOpacity
          style={styles.existingLoginButton}
          onPress={handleExistingLogin}
        >
          <Text style={styles.existingLoginButtonText}>
            Login as {userInfo.name}
          </Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={styles.signupLink}
        onPress={handleRegistrationPress}
      >
        <Text style={styles.signupLinkText}>Create a new account</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  topSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userProfile: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  levelText: {
    fontSize: 16,
    color: "#888",
  },
  midSection: {
    flex: 2,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tinyLogo: {
    marginTop: 10,
    alignSelf: "center",
    width: 300,
    height: 200,
    borderRadius: 7,
  },
  subTitle: {
    marginTop: -10,
    marginBottom: 20,
    color: "#252525",
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  forget: {
    color: colors.primary,
    marginBottom: 15,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  existingLoginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: colors.primary,
    borderWidth: 1,
    marginTop: 10,
  },
  existingLoginButtonText: {
    color: colors.primary,
    fontSize: 16,
  },
  signupLink: {
    marginTop: 5,
    flexDirection: "row",
  },
  signupText: {
    color: colors.gray,
  },

  signupLinkText: {
    color: colors.primary,
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    height: 50,
    borderRadius: 8,
    margin: 10,
    padding: 10,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  messageContainer: {
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
    padding: 10,
    width: "100%",
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
  },
  errorContainer: {
    alignItems: "center",
  },
});

export default LoginScreen;
