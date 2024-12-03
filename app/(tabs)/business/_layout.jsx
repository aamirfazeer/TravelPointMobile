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
      <Stack.Screen name="editGuidProfile" options={{ headerShown: false }} />
      <Stack.Screen name="guideForm" options={{ headerShown: false }} />
      <Stack.Screen name="equipmentForm" options={{ headerShown: false }} />
      <Stack.Screen name="vehicleForm" options={{ headerShown: false }} />
      <Stack.Screen name="addVehicle" options={{ headerShown: false }} />
      <Stack.Screen name="myVehicle" options={{ headerShown: false }} />
      <Stack.Screen name="editVehicle" options={{ headerShown: false }} />
      <Stack.Screen name="equipmentServiceProvider" options={{ headerShown: false }} />
      <Stack.Screen name="myEquipment" options={{ headerShown: false }} />
      <Stack.Screen name="addEquipment" options={{ headerShown: false }} />
      <Stack.Screen name="reqProgressing" options={{ headerShown: false }} />
      <Stack.Screen name="vehicleServiceProvider" options={{ headerShown: false }} />
      <Stack.Screen name="guideServiceProvider" options={{ headerShown: false }} />
      <Stack.Screen name="bookingUser" options={{ headerShown: false }} />
      <Stack.Screen name="bookingEquipment" options={{ headerShown: false }} />
      <Stack.Screen name="bookingPayment" options={{ headerShown: false }} />
      <Stack.Screen name="bookingGuide" options={{ headerShown: false }} />
      <Stack.Screen name="viewGuidBookingInfo" options={{ headerShown: false }} />
      <Stack.Screen name="viewVehicleBookingInfo" options={{ headerShown: false }} />
      <Stack.Screen name="viewEquipmentbookinginfo" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Stacklayout;
