import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../themes/colors";

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleSignupPress = () => {
    navigation.navigate("Signup");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // console.log("Email:", email);
    // console.log("Password:", password);
    navigation.navigate("SkillTestMessage");
  };

  const handleHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("../assets/undraw-adventure-map-hnin-21.png")}
      />
      <Text style={styles.title}>Welcome to WordSage</Text>
      <Text style={styles.subTitle}>Sign in to access your account</Text>

      <View style={styles.SectionStyle}>
        <TextInput
          //style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Image
          source={require("../assets/mail.png")}
          style={styles.ImageStyle}
        />
      </View>

      <View style={styles.SectionStyle}>
        <TextInput
          //style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Image
          source={require("../assets/lock.png")}
          style={styles.ImageStyle}
        />
      </View>

      <Pressable>
        <Text style={styles.forget}> Forget password?</Text>
      </Pressable>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupLink} onPress={handleSignupPress}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Text style={styles.signupLinkText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.subTitle} onPress={handleHome}>
        <Text
          style={{
            color: "#3988FF",
            marginTop: 15,
          }}
        >
          Home
        </Text>
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
    backgroundColor: colors.White,
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
    color: "#3988FF",
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
  signupLink: {
    marginTop: 5,
    flexDirection: "row",
  },
  signupText: {
    color: colors.Gray,
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
});

export default LoginScreen;
