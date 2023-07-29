import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import colors from "../themes/colors";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignup = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Phone:", phone);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require("../assets/undraw-adventure-map-hnin-21.png")}
      />
      <Text style={styles.title}>Get Started</Text>
      <Text style={styles.subTitle}>by creating a free account </Text>

      <View style={styles.SectionStyle}>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Image
          source={require("../assets/user.png")}
          style={styles.ImageStyle}
        />
      </View>

      <View style={styles.SectionStyle}>
        <TextInput
          placeholder="Valid Email"
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

      <View style={styles.SectionStyle}>
        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <Image
          source={require("../assets/phone.png")}
          style={styles.ImageStyle}
        />
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupLink}>
        <Text style={styles.signupText}>Already a member? </Text>
        <Text style={styles.signupLinkText}>Login</Text>
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
  },
  tinyLogo: {
    marginTop: 10,
    alignSelf: "center",
    width: 300,
    height: 200,
    borderRadius: 7,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    marginTop: -10,
    marginBottom: 20,
    color: "#252525",
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
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  signupButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  signupButtonText: {
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
});

export default SignupScreen;
