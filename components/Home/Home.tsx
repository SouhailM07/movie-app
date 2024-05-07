import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { homeStyles } from "./homeStyles.ts";
import tw from "../../lib/tailwind.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// components
import Watching from "../Watching/Watching.tsx";
import Navbar from "../Navbar/Navbar.tsx";

//
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
export default function Home() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="mainHome"
        component={MainHome}
        options={{
          header: (props) => <Navbar />,
        }}
      />
    </Drawer.Navigator>
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
        contentContainerStyle={tw`pt-[2rem] pb-[4rem]  gap-y-[1.8rem]`}
        style={tw`min-h-full`}
      >
        {arr.map((e, i) => {
          return <Watching key={i} {...e} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
