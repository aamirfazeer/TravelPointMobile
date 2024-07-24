import { Stack } from "expo-router";

const Stacklayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="add_log" options={{ headerShown: false }} />
        <Stack.Screen name="add_story" options={{ headerShown: false }} />
    </Stack>
  )
}

export default Stacklayout;