import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const ForgotPassword = () => {
  const [code, setCode] = useState('');

  const handleCodeChange = (text) => {
    setCode(text);
  };

  const handleResendCode = () => {
    // Implement logic to resend code
    console.log('Resending code...');
  };

  const handleSubmit = () => {
    // Implement logic to submit code and verify
    console.log('Submitting code:', code);
  };

  return (
    <View style={styles.container}>
        <Text style={styles.header}>TravelPoint</Text>
        <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>Enter Recovery Code</Text>
            <View style={styles.codeInput}>
                <TextInput
                style={styles.codeBox}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={handleCodeChange}
                value={code.substring(0, 1)}
                />
                <TextInput
                style={styles.codeBox}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={handleCodeChange}
                value={code.substring(1, 2)}
                />
                <TextInput
                style={styles.codeBox}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={handleCodeChange}
                value={code.substring(2, 3)}
                />
                <TextInput
                style={styles.codeBox}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={handleCodeChange}
                value={code.substring(3, 4)}
                />
            </View>
            <Text style={styles.resendCode} onPress={handleResendCode}>
                resend code
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#083759',
    position: 'absolute', // Position the header absolutely
    top: 20, // Distance from the top
    left: 20, // Distance from the left
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 30,
    borderRadius: 15,
    backgroundColor: '#083759',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  codeInput: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  codeBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    marginHorizontal: 5,
  },
  resendCode: {
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f05050',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ForgotPassword;