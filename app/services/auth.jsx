import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const register = async (email, code) => {
  try {
    const response = await axios.post("http://10.0.2.2:8000/verify-otp", {
      email,
      otp: code.toString(),
    });

    const {
      access_token: token,
      token_type: type,
      user_id: userId,
    } = response.data;

    const statusCode = response.status;

    console.log(response.status);

    await AsyncStorage.setItem("userId", userId.toString());
    await AsyncStorage.setItem("token", token);

    return response.status;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const login = async (userDetails) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `http://10.0.2.2:8000/login`,
      userDetails,
      config
    );
    
    const {
      access_token: token,
      token_type: type,
      user_id: userId,
    } = response.data; // Assuming response contains userId and JWT token

    // Store userId and token in AsyncStorage
    await AsyncStorage.setItem('userId', userId.toString());
    await AsyncStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Function to log out the user and clear AsyncStorage
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

// Function to check if the user is logged in
export const isLoggedIn = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem('token');
    return userId !== null && token !== null; // Check if both userId and token are available
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

// Function to get the token for authenticated requests
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export default { login, logout, isLoggedIn, getToken };
