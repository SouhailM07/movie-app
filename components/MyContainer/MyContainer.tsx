import { SafeAreaView, Text, View } from "react-native";
import { mycontainerStyles } from "./mycontainerStyles.ts";
import tw from "../../lib/tailwind.js";
// components
import MyOnboarding from "../MyOnboarding/MyOnboarding.tsx";
import Home from "../Home/Home.tsx";
//
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

export default function MyContainer() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="welcoming" component={MyOnboarding} />
          <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
