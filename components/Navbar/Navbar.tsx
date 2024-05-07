import { Pressable, Text, View } from "react-native";
import { navbarStyles } from "./navbarStyles.ts";
import tw from "../../lib/tailwind.js";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBars,
  faCompactDisc,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  // main vars
  const icons_size = 19;
  const navigation: any = useNavigation();
  // ! handlers
  const handleBars = () => navigation.openDrawer();
  return (
    <>
      <View
        style={tw`items-center h-[4rem]  px-[1.2rem] flex-row justify-between bg-slate-700`}
      >
        <Pressable onPress={handleBars}>
          <FontAwesomeIcon icon={faBars} color="white" size={icons_size} />
        </Pressable>
        <View style={tw` items-center flex-row`}>
          <Text style={tw`text-white text-[1.3rem]`}>M</Text>
          <FontAwesomeIcon icon={faCompactDisc} color="white" />
          <Text style={tw`text-white text-[1.3rem]`}>vies App</Text>
        </View>
        <FontAwesomeIcon icon={faSearch} color="white" size={icons_size} />
      </View>
    </>
  );
}
