import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { ywatchingStyles } from "./ywatchingStyles.ts";
import tw from "../../lib/tailwind.js";
import { useNavigation } from "@react-navigation/native";
import selectedContent_store from "../../zustand/selectedContent_store.js";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/

const { width } = Dimensions.get("window");

export default function Ywatching({ watch }) {
  const navigation: any = useNavigation();
  let { editSelectedContent } = selectedContent_store((state) => state);
  const handlePress = () => {
    editSelectedContent(watch.id);
    navigation.navigate("viewContent");
  };
  return (
    <Pressable onPress={handlePress} style={tw`w-[${width / 4 / 3.5}] `}>
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
        {watch?.original_title || watch?.original_name}
      </Text>
    </Pressable>
  );
}
