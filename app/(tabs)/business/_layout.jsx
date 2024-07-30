import { Stack } from "expo-router";
const Stacklayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="findGuide" options={{ headerShown: false }} />
      <Stack.Screen name="findEquipment" options={{ headerShown: false }} />
      <Stack.Screen name="findVehicle" options={{ headerShown: false }} />
      <Stack.Screen name="guideList" options={{ headerShown: false }} />
      <Stack.Screen name="equipmentList" options={{ headerShown: false }} />
      <Stack.Screen name="vehicleList" options={{ headerShown: false }} />
      <Stack.Screen name="equipmentDetails" options={{ headerShown: false }} />
      <Stack.Screen name="vehicleDetails" options={{ headerShown: false }} />
      <Stack.Screen name="guideDetails" options={{ headerShown: false }} />
      <Stack.Screen name="authorityForm" options={{ headerShown: false }} />
      <Stack.Screen name="guideForm" options={{ headerShown: false }} />
      <Stack.Screen name="equipmentForm" options={{ headerShown: false }} />
      <Stack.Screen name="vehicleForm" options={{ headerShown: false }} />
      <Stack.Screen name="bookedVehicle" options={{ headerShown: false }} />
      <Stack.Screen name="bookedGuid" options={{ headerShown: false }} />
      <Stack.Screen name="addVehicle" options={{ headerShown: false }} />
      <Stack.Screen name="manageVehicle" options={{ headerShown: false }} />
      <Stack.Screen name="editVehicle" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Stacklayout;
