import { Pressable, Text, View } from "react-native";
import { navbarStyles } from "./navbarStyles.ts";
import tw from "../../lib/tailwind.js";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBarsStaggered,
  faCircleUser,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/
// * this is a header for the home route

export default function Navbar() {
  // main vars
  const icons_color: string = "white";
  const navigation: any = useNavigation();
  // ! handlers
  const handleBars = () => navigation.openDrawer();
  return (
    <>
      <View
        style={tw`items-center h-[4rem] px-[1.2rem] flex-row justify-between bg-slate-700`}
      >
        <Pressable onPress={handleBars}>
          <FontAwesomeIcon
            icon={faBarsStaggered}
            color={icons_color}
            size={20}
          />
        </Pressable>
        <View style={tw` items-center flex-row`}>
          <Text style={tw`text-white text-[1.3rem]`}>M</Text>
          <FontAwesomeIcon icon={faCompactDisc} color={icons_color} />
          <Text style={tw`text-white text-[1.3rem]`}>vies App</Text>
        </View>
        <Pressable>
          <FontAwesomeIcon icon={faCircleUser} color={icons_color} size={24} />
        </Pressable>
      </View>
    </>
  );
}
