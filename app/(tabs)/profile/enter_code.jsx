
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const router = useRouter();

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleResendCode = () => {
    // Implement logic to resend code
    console.log('Resending code...');
  };

  const handleSubmit = () => {
    // Implement logic to submit code and verify
    console.log('Submitting code:', code.join(''));
    router.push('/profile/enter_code');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Password Reset</Text>
        <Text style={styles.description}>
        Please Enter Recovery Code to reset your password.
        </Text>
        <View style={styles.codeInput}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.codeBox}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(text) => handleCodeChange(text, index)}
              value={digit}
            />
          ))}
        </View>
        <Text style={styles.resendPrompt}>Didn't receive code? <Text style={styles.resendCode} onPress={handleResendCode}>Resend</Text></Text>
        <TouchableOpacity style={styles.button} onPress={() => { router.push('/profile/reset_pw'); }}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
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
    borderColor: '#28a745',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 24,
    color: '#000',
    marginHorizontal: 5,
  },
  resendPrompt: {
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  resendCode: {
    color: '#28a745',
    textDecorationLine: 'underline',
  },
  button: {
    width: '60%',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
