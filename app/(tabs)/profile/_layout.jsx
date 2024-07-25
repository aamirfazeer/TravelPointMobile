import { Stack } from "expo-router";

const Stacklayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="edit_profile" options={{ headerShown: false }} />
        <Stack.Screen name="change_pw" options={{ headerShown: false }} />
    </Stack>
  )
}

export default Stacklayout;