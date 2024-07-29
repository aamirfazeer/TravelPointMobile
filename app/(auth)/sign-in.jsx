// import { View, Text, SafeAreaView, ScrollView, Image} from 'react-native'
// import React, {useState} from 'react'
// import { Link, useRouter } from 'expo-router'
// import { images }  from '../../constants'
// import FormField from '../../components/FormField'
// import  CustomButton  from '../../components/CustomButton'
// import BackButton from '../../components/BackButton'

// const SignIn = () => {

//   const router = useRouter();

//   const [form, setForm] = useState({
//     email: '',
//     password: ''
//   })

//   const [isSubmitting, setisSubmitting] = useState(false)

//   const submit = () =>{

//   }

//   return (
//     <SafeAreaView className="bg-primary h-full">
//       <ScrollView>
//         <View>
//         <BackButton
//         handlePress={()=>router.push('../')}
//         />
//         </View>
        
//         <View className="w-full items-center mt-4 min-h-[0vh]">
//           <Image source={images.travelpoint_image}
//           resizeMode='contain'
//           className="w-[360px] h-[120px]"/>
//         </View>

//         <View className="w-full items-center mt-1">
//           <Text className="text-2xl text-black mt-10 font-Ibold">
//             Log in to TravelPoint
//           </Text>
//         </View>
//         <View className="w-full mt-1 px-20">
//         <FormField 
//             title="Email"
//             value={form.email}
//             placeholder='E-mail'
//             handleChangeText={(e)=> setForm({ ...form, email: e})}
//             otherStyles="mt-7"
//             keyboardType="email-address"
//           />
//           <FormField 
//             title="Password"
//             value={form.password}
//             placeholder='password'
//             handleChangeText={(e)=> setForm({ ...form, password: e})}
//             otherStyles="mt-7"
            
//           />

//           <CustomButton 
//             title="Log in"
//             handlePress={submit}
//             containerStyles=" mt-10 "
//             isLoading={isSubmitting}
//           />

//           <View className="justify-center pt-5 flex-row gap-2">
//             <Text className="text-lg text-black font-IRegular">
//               Don't have an account?
              
//             </Text>
//             <Link href="/sign-up" className="text-lg font-IRegular text-secondary">
//               Sign-up
//             </Link>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default SignIn

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { router } from 'expo-router'
import { images } from '../../constants'; // Make sure the correct path to the images is used

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

  const handleLogin = () => {
    console.log('Login details:', {
      email,
      password,
    });
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
            secureTextEntry={!passwordVisible} // Toggle secureTextEntry based on passwordVisible state
          />
          <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
            <Icon
              name={passwordVisible ? "visibility" : "visibility-off"} // Change icon based on password visibility
              size={20}
              color="#444"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={()=>router.push('/forgetPassword')}>
          <Text style={styles.forgotPassword}>forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={()=>router.push('/home')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity style={styles.googleButton} onPress={()=>router.push('/home')}>
          <Image source={images.google} style={styles.googleImage} />
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <TouchableOpacity onPress={()=>router.push('/sign-up')}>
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
    alignItems: 'center', // Center the content horizontally
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
    width: '100%', // Full width input container
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
