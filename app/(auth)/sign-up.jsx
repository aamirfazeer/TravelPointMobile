// import { View, Text, SafeAreaView, ScrollView, Image} from 'react-native'
// import React, {useState} from 'react'
// import { Link, useRouter } from 'expo-router'
// import { images }  from '../../constants'
// import FormField from '../../components/FormField'
// import  CustomButton  from '../../components/CustomButton'
// import BackButton from '../../components/BackButton'

// const SignUp = () => {

//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: '',
//     contact_number:'',
//     address:'',
//     email: '',
//     password: '',
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

//         <View className="w-full items-center mt-4 ">
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
//           <FormField
//             title="Name"
//             value={form.name}
//             handleChangeText={(e)=> setForm({ ...form, name: e})}
//             otherStyles="mt-4"
//           />
//           <FormField
//             title="Contact No."
//             value={form.contact_number}
//             handleChangeText={(e)=> setForm({ ...form, contact_number: e})}
//             otherStyles="mt-4"
//           />
//           <FormField
//             title="Address"
//             value={form.address}
//             handleChangeText={(e)=> setForm({ ...form, address: e})}
//             otherStyles="mt-4"
//           />
//           <FormField
//             title="E-mail"
//             value={form.pemail}
//             handleChangeText={(e)=> setForm({ ...form, email: e})}
//             otherStyles="mt-4"
//           />
//           <FormField
//             title="Password"
//             value={form.password}
//             handleChangeText={(e)=> setForm({ ...form, password: e})}
//             otherStyles="mt-4"
//           />

//           <CustomButton
//             title="Log-in"
//             handlePress={submit}
//             containerStyles=" mt-10 "
//             isLoading={isSubmitting}
//           />

//           <View className="justify-center pt-5 flex-row gap-2 mb-10">
//             <Text className="text-lg text-black font-IRegular">
//               Have an account already?

//             </Text>
//             <Link href="/sign-up" className="text-lg font-IRegular text-secondary">
//               Sign in
//             </Link>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default SignUp
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { CheckBox } from "react-native-elements";

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nicPassport: "",
    contactNumber: "",
    location: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = () => {
    // Handle the sign-up logic here
    console.log(formData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title} className=" font-pbold ">Set up your account</Text>
        <Text style={styles.subtitle}>
          Please complete all information to create an account on TravelPoint
        </Text>
      </View>
      <View >
        <TextInput className=" font-pmedium"
          style={styles.input}
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(value) => handleChange("firstName", value)}
        />
        <TextInput className=" font-pmedium"
          style={styles.input}
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(value) => handleChange("lastName", value)}
        />
        <TextInput className=" font-pmedium"
          style={styles.input}
          placeholder="NIC / Passport Number"
          value={formData.nicPassport}
          onChangeText={(value) => handleChange("nicPassport", value)}
        />
        <TextInput className=" font-pmedium"
          style={styles.input}
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChangeText={(value) => handleChange("contactNumber", value)}
        />
        <TextInput className=" font-pmedium"
          style={styles.input}
          placeholder="Location"
          value={formData.location}
          onChangeText={(value) => handleChange("location", value)}
        />
        <TextInput className=" font-pmedium"
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleChange("password", value)}
        />
        <TextInput className=" font-pmedium"
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(value) => handleChange("confirmPassword", value)}
        />
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={formData.agreeTerms}
          onValueChange={(value) => handleChange("agreeTerms", value)}
        />
        <Text style={styles.checkboxLabel}>
          Agree to <Text style={styles.link}>Terms of Use</Text> and{" "}
          <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    //justifyContent: 'center',
    marginBottom: 20,
    textAlign: "center",
  },
  title: {
    //fontFamily:Poppins,
    //fontWeight:medium,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    //justifyContent: "center",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 0,
  },
  link: {
    color: "#007BFF",
  },
  button: {
    backgroundColor: "#06D001",
    paddingVertical: 10,
    borderRadius: 34,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default SignUpScreen;
