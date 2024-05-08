import { Dimensions, Image, Pressable, Text } from "react-native";
import { vwatchingStyles } from "./vwatchingStyles.ts";
import tw from "../../lib/tailwind.js";
import { useNavigation } from "@react-navigation/native";
import selectedContent_store from "../../zustand/selectedContent_store.js";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/
// * vertical content for watching [The render component]

const { width } = Dimensions.get("window");

export default function Vwatching({ watch }) {
  const navigation: any = useNavigation();
  let { editSelectedContent } = selectedContent_store((state) => state);
  const handlePress = () => {
    editSelectedContent(watch.id);
    navigation.navigate("viewContent");
  };
  return (
    <Pressable
      onPress={handlePress}
      style={tw`w-[${width / 4 / 3}] mx-[0.6rem]`}
    >
      <Image
        style={tw`rounded-xl w-full h-[${(width / 4 / 3) * 1.7}]`}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${watch?.poster_path}`,
        }}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={tw`text-white font-medium mt-5`}
      >
        {watch?.original_title}
        {watch?.original_name}
      </Text>
    </Pressable>
  );
}
