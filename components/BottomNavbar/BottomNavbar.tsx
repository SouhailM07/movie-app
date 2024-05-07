import { Text, View } from "react-native";
import { bottomnavbarStyles } from "./bottomnavbarStyles.ts";
import tw from "../../lib/tailwind.js";
//
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home/Home.tsx";
import {
  faClockRotateLeft,
  faHeart,
  faHome,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import WatchList from "../WatchList/WatchList.tsx";
import FavoriteList from "../FavoriteList/FavoriteList.tsx";
import SearchPanel from "../SearchPanel/SearchPanel.tsx";

const Tab = createBottomTabNavigator();

export default function BottomNavbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "rgb(51 65 85)",
          borderTopWidth: 0,
        },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          size = 22;
          if (route.name === "home") {
            iconName = faHome;
          } else if (route.name === "watchList") {
            iconName = faClockRotateLeft;
          } else if (route.name === "favoriteList") {
            iconName = faHeart;
          } else if (route.name === "search") {
            iconName = faSearch;
          }
          // component icon
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "rgb(74 222 128)",
        tabBarInactiveTintColor: "white",
      })}
    >
      <Tab.Screen options={{ title: "Home" }} name="home" component={Home} />
      <Tab.Screen
        options={{ title: "Search" }}
        name="search"
        component={SearchPanel}
      />
      <Tab.Screen
        options={{ title: "Later" }}
        name="watchList"
        component={WatchList}
      />
      <Tab.Screen
        options={{ title: "Favorite" }}
        name="favoriteList"
        component={FavoriteList}
      />
    </Tab.Navigator>
  );
}
