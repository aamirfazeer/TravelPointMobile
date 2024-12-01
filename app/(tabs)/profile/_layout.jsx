import { Stack } from "expo-router";

const Stacklayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="edit_profile" options={{ headerShown: false }} />
      <Stack.Screen name="manage_password" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="languages" options={{ headerShown: false }} />
      <Stack.Screen name="privacy" options={{ headerShown: false }} />
      <Stack.Screen name="forget_pass" options={{ headerShown: false }} />
      <Stack.Screen name="enter_code" options={{ headerShown: false }} />
      <Stack.Screen name="reset_pw" options={{ headerShown: false }} />
      <Stack.Screen name="delete_acc" options={{ headerShown: false }} />
      <Stack.Screen name="profile_posts" options={{ headerShown: false }} />
      <Stack.Screen name="user_posts" options={{ headerShown: false }} />
      <Stack.Screen name="user_profile" options={{ headerShown: false }} />
    </Stack>
  );
}

export default Stacklayout;