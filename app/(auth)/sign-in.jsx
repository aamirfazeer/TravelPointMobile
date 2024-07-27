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

// app/login.js
import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking, ScrollView, 
} from "react-native";
import { router } from "expo-router";
import { images } from "../../constants";
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function LoginScreen({ navigation }) {

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={images.login} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Connect with us!</Text>
        <TextInput placeholder="Email or Username" style={styles.input} />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon name={passwordVisible ? "visibility" : "visibility-off"} size={24} color="#999"  padding={10} />
          </TouchableOpacity>
        </View>
        <Text
          style={styles.forgotPassword}
          onPress={() => {
            /* handle forgot password */
          }}
        >
          forgot password?
        </Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            /* handle login */
          }}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => {
            /* handle Google login */
          }}
        >
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}>
          Don't have an account?{" "}
          <Text
            style={styles.signUpLink}
            onPress={()=>router.push('/sign-up/')}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
     borderWidth: 1,
     borderColor: "#ccc",
     borderRadius: 10,
     padding: 10,
     paddingRight: 10,
     paddingBottom: 10,
     paddingLeft: 10,
     marginBottom: 15,
    // flex: 1,
    // paddingTop: 10,
    // paddingRight: 10,
    // paddingBottom: 10,
    // paddingLeft: 0,
    // backgroundColor: '#fff',
    // color: '#424242',
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },

  passwordInput: {
    flex: 1,
    //padding: 10,
  },

  
  forgotPassword: {
    textAlign: "right",
    color: "#999",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#06D001",
    borderRadius: 34,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    marginBottom: 20,
    color: "#999",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 34,
    padding: 15,
    marginBottom: 20,
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  signUpText: {
    textAlign: "center",
    color: "#999",
  },
  signUpLink: {
    color: "#00f",
  },
});
