import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router'
import { images } from '../../constants';
import { login } from '../services/auth.jsx'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Error", "Email is required");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Password is required");
      return;
    }

    const userDetails = {
      email: email,
      password: password,
    };

    // console.log("User details:", JSON.stringify(userDetails, null, 2));
    console.log(`http://10.0.2.2:8000/auth/login/${userDetails.email}/${userDetails.password}`)


    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {

      const response = await login(userDetails); // Calls login function
      Alert.alert("Success", "Logged in successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", "Invalid email or password");
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={images.sign_in} style={styles.headerImage} />
      <View style={styles.container}>
        <Text style={styles.headerText}>Connect with us!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email or Username"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={togglePasswordVisibility}
          >
            <Icon
              name={passwordVisible ? "visibility" : "visibility-off"}
              size={20}
              color="#444"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.forgotPasswordContainer}
          onPress={() => router.push("/forgetPassword")}
        >
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => router.push("/home")}
        >
          <Image source={images.google} style={styles.googleImage} />
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/sign-up")}>
            <Text style={styles.signUpLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
  },
  iconContainer: {
    marginLeft: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#1e90ff',
  },
  loginButton: {
    backgroundColor: '#00cc44',
    paddingVertical: 10,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: 222,
    height: 45,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
    color: '#666',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 34,
    paddingVertical: 10,
    width: 222,
    height: 45,
    marginBottom: 20,
  },
  googleImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#444',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#666',
  },
  signUpLink: {
    fontSize: 16,
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
