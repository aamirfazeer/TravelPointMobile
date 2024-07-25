import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { images } from '../constants';
import { router } from 'expo-router';

const App = () => {
  return (
    
    <View style={styles.container}>
      <Image source={images.onboard} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.brand}>TravelPoint</Text>
        <Text style={styles.description}>
          Make your travel planning seamless and share experiences with your travel companions
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/sign-in')}>
          <Text style={styles.buttonText}>Let's Travel</Text>
        </TouchableOpacity>
      </View>
    </View>

          <CustomButton 
            title="Get Started"

            handlePress={()=>router.push('/create/add_log')}

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
