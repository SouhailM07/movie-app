import { SafeAreaView, ScrollView } from "react-native";
import { homeStyles } from "./homeStyles.ts";
import tw from "../../lib/tailwind.js";
import { createDrawerNavigator } from "@react-navigation/drawer";
// ? types
import { globalStyles } from "../../globalStyles.ts";
// components
import Watching from "../Watching/Watching.tsx";
import Navbar from "../Navbar/Navbar.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";

//
const Drawer = createDrawerNavigator();
export default function Home() {
  return (
    <Drawer.Navigator drawerContent={() => <Sidebar />}>
      <Drawer.Screen
        name="drawerHome"
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
    <SafeAreaView style={tw`${globalStyles.safe_area_container}`}>
      <ScrollView
        contentContainerStyle={tw`pt-[2rem] pb-[4rem] gap-y-[1.4rem]`}
        style={tw`min-h-full`}
      >
        {arr.map((e, i) => {
          return <Watching key={i} {...e} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
