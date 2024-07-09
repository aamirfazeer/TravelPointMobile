import { View, Text, SafeAreaView, ScrollView, Image} from 'react-native'
import React, {useState} from 'react'
import { Link, useRouter } from 'expo-router'
import { images }  from '../../constants'
import FormField from '../../components/FormField'
import  CustomButton  from '../../components/CustomButton'
import BackButton from '../../components/BackButton'

const SignIn = () => {

  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = () =>{

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View>
        <BackButton
        handlePress={()=>router.push('../')}
        />
        </View>
        
        <View className="w-full items-center mt-4 min-h-[0vh]">
          <Image source={images.travelpoint_image}
          resizeMode='contain'
          className="w-[360px] h-[120px]"/>
        </View>

        <View className="w-full items-center mt-1">
          <Text className="text-2xl text-black mt-10 font-Ibold">
            Log in to TravelPoint
          </Text>
        </View>
        <View className="w-full mt-1 px-20">
        <FormField 
            title="Email"
            value={form.email}
            placeholder='E-mail'
            handleChangeText={(e)=> setForm({ ...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField 
            title="Password"
            value={form.password}
            placeholder='password'
            handleChangeText={(e)=> setForm({ ...form, password: e})}
            otherStyles="mt-7"
            
          />

          <CustomButton 
            title="Log in"
            handlePress={submit}
            containerStyles=" mt-10 "
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black font-IRegular">
              Don't have an account?
              
            </Text>
            <Link href="/sign-up" className="text-lg font-IRegular text-secondary">
              Sign-up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn