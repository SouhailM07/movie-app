import { bottomnavbarStyles } from "./bottomnavbarStyles.ts";
import tw from "../../lib/tailwind.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// components
import Home from "../Home/Home.tsx";
import WatchList from "../WatchList/WatchList.tsx";
import FavoriteList from "../FavoriteList/FavoriteList.tsx";
import SearchPanel from "../SearchPanel/SearchPanel.tsx";
// assets
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faClockRotateLeft,
  faHeart,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

export default function BottomNavbar() {
  interface bottomNavRoutes_t {
    name: string;
    options: { title: string; headerShown: boolean };
    component: () => React.JSX.Element;
  }
  const bottomNavRoutes: bottomNavRoutes_t[] = [
    // { title: e.title, headerShown: e.showHeader }
    {
      name: "home",
      component: Home,
      options: { title: "Home", headerShown: false },
    },
    {
      name: "search",
      options: { title: "Search", headerShown: false },
      component: SearchPanel,
    },
    {
      name: "watchList",
      options: { title: "Later", headerShown: true },
      component: WatchList,
    },
    {
      name: "favoriteList",
      options: { title: "Favorite", headerShown: true },
      component: FavoriteList,
    },
  ];
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "rgb(51 65 85)" },
        headerTitleStyle: { color: "white" },
        tabBarStyle: {
          backgroundColor: "rgb(51 65 85)",
          borderTopWidth: 0,
        },
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
      {bottomNavRoutes.map((e, i) => (
        <Tab.Screen key={i} {...e} />
      ))}
    </Tab.Navigator>
  );
}
