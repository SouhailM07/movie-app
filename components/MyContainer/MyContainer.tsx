import { SafeAreaView } from "react-native";
import { mycontainerStyles } from "./mycontainerStyles.ts";
import tw from "../../lib/tailwind.js";
// components
import MyOnboarding from "../MyOnboarding/MyOnboarding.tsx";
import SeeMore from "../SeeMore/SeeMore.tsx";
import SelectedContent from "../SelectedContent/SelectedContent.tsx";
//
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();
import seeMore_store from "../../zustand/seeMore_store.js";
import BottomNavbar from "../BottomNavbar/BottomNavbar.tsx";

export default function MyContainer() {
  const { selectedMoreContent } = seeMore_store((state) => state);
  return (
    <>
      <SafeAreaView style={tw`min-h-full w-full bg-slate-800 `}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="primeHome">
              {() => <BottomNavbar />}
            </Stack.Screen>
            <Stack.Screen name="welcoming" component={MyOnboarding} />
            <Stack.Screen name="viewContent" component={SelectedContent} />
            <Stack.Screen
              name="seeMore"
              component={SeeMore}
              options={{
                headerShown: true,
                headerTitle: selectedMoreContent?.title,
                headerStyle: { backgroundColor: "rgb(51 65 85)" },
                headerTitleStyle: { color: "white" },
                headerTintColor: "red",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
