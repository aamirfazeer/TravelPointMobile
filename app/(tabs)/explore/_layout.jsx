import { Stack } from "expo-router";

const Stacklayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="detail" options={{ headerShown: false }} />
        <Stack.Screen name="index1" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
        <Stack.Screen name="test2" options={{ headerShown: false }} />
    </Stack>
  )
}

export default Stacklayout;