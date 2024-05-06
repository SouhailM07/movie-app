import { SafeAreaView, ScrollView } from "react-native";
import { homeStyles } from "./homeStyles.ts";
import tw from "../../lib/tailwind.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import seeMore_store from "../../zustand/seeMore_store.js";
// components
import Watching from "../Watching/Watching.tsx";
import SeeMore from "../SeeMore/SeeMore.tsx";
//

const Stack = createNativeStackNavigator();
export default function Home() {
  const { selectedMoreContent } = seeMore_store((state) => state);
  return (
    <SafeAreaView style={tw`min-h-full w-full bg-slate-800 `}>
      <Stack.Navigator>
        <Stack.Screen
          name="mainHome"
          component={MainHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="seeMore"
          component={SeeMore}
          options={{
            headerTitle: selectedMoreContent?.title,
            headerStyle: { backgroundColor: "rgb(51 65 85)" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "red",
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

let MainHome = () => {
  let arr = [
    { title: "Popular", apiUrl: "movie/popular" },
    { title: "Top Rated", apiUrl: "movie/top_rated" },
    { title: "Now playing", apiUrl: "movie/now_playing" },
    { title: "Movies", apiUrl: "discover/movie" },
    { title: "Tv", apiUrl: "discover/tv" },
    { title: "Upcoming", apiUrl: "movie/upcoming" },
  ];
  return (
    <SafeAreaView style={tw`min-h-full w-full bg-slate-800`}>
      <ScrollView
        contentContainerStyle={tw`py-[3rem]  gap-y-[1.8rem]`}
        style={tw`min-h-full`}
      >
        {arr.map((e, i) => {
          return <Watching key={i} {...e} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
