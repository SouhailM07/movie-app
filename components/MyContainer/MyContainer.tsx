import { globalStyles } from "../../globalStyles.ts";
import { SafeAreaView } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { mycontainerStyles } from "./mycontainerStyles.ts";
import tw from "../../lib/tailwind.js";
import seeMore_store from "../../zustand/seeMore_store.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
// components
import MyOnboarding from "../MyOnboarding/MyOnboarding.tsx";
import SeeMore from "../SeeMore/SeeMore.tsx";
import SelectedContent from "../SelectedContent/SelectedContent.tsx";
import BottomNavbar from "../BottomNavbar/BottomNavbar.tsx";
import SearchResults from "../SearchResults/SearchResults.tsx";
import Toast from "react-native-toast-message";
import Loading from "../Loading/Loading.tsx";
//

/*===============================================================================================*/
// main component section
/*===============================================================================================*/

const Stack = createNativeStackNavigator();

export default function MyContainer() {
  const { selectedMoreContent } = seeMore_store((state) => state);
  useEffect(() => {
    checkConnection();
  }, []);
  return (
    <>
      <SafeAreaView style={tw`${globalStyles.safe_area_container} `}>
        <Loading />
        <NavigationContainer>
          <Stack.Screen name="welcoming" component={MyOnboarding} />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="tabsHome">
              {() => <BottomNavbar />}
            </Stack.Screen>
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
            <Stack.Screen
              name="searchResults"
              component={SearchResults}
              options={{
                headerShown: true,
                headerTitle: "Search Results",
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

const checkConnection = () => {
  const unsubscribe = NetInfo.addEventListener((state) => {
    state.isConnected
      ? Toast.show({
          type: "success",
          text1: "user is online",
        })
      : Toast.show({
          type: "error",
          text1: "user is offline",
        });
  });
  return () => unsubscribe();
};
