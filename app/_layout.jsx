import { StyleSheet, Text, View } from 'react-native'
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
      "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
      "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
      "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
      "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
      "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
      "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
      "Junge-Regular": require("../assets/fonts/Junge-Regular.ttf"),
      "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
      "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
      "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    });
  
    useEffect(() => {
      if (error) throw error;
    
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded, error]);
    
    if (!fontsLoaded && !error) {
      return null;
    }

  return (
    <Stack>
        <Stack.Screen name ="index" options={{headerShown:false}}/> 
        <Stack.Screen name ="(tabs)" options={{headerShown:false}}/>        
    </Stack>
      
  )
}

export default RootLayout





//rnfes is a react native functional component  with styles
// Slot basically renders the current child route. like children prop in react. 
// we must add text strings within <Text> component, so that its rendered, or else will get an error.
// the above is hust one way to implement navigation and layouts in react native. (26.00). the alternative is to use stack of different screens.
       /* return (
            <Stack>
                <Stack.Screen name ="index" options={{headerShown:false}}/>
            </Stack>
        )*/
          /*  <>
            <Text>Header</Text>
            <Slot />
            <Text>Footer</Text>
        </>*/
