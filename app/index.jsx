import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import {Redirect, router, Link} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-start items-center min-h-[85vh] pt-24 px-4">
          <Image
            source={images.travelpoint_image}
            className='w-[480px] h-[240px] '
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text style={{ fontFamily: 'Inter-Bold', fontSize: 38, textAlign: 'center', color: '#446482' }}>Welcome to
            </Text>
          </View>

          <Image
            source={images.travelpoint_logo}
            className='w-full h-[64px]'
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text style={{ fontFamily: 'Junge-Regular', fontSize: 20, textAlign: 'center', color: 'black' }}>All Your travel needs 
              at your finger tips...
            </Text>
          </View>

          <CustomButton 
            title="Get Started"
<<<<<<< HEAD
            handlePress={()=>router.push('/business/findEquipment')}
=======
            handlePress={()=>router.push('/profile/settings')}
>>>>>>> 338be18c51eef2d6d5e334a7e90aad89e9f4e70b
            containerStyles="w-[180px] mt-10"
          />
          <Link href="/home" className="text-lg font-IRegular text-secondary">
          Home
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
