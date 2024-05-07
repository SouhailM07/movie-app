import {
  Text,
  Dimensions,
  SafeAreaView,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { searchresultsStyles } from "./searchresultsStyles.ts";
import tw from "../../lib/tailwind.js";
import { globalStyles } from "../../globalStyles.ts";
import selectedContent_store from "../../zustand/selectedContent_store.js";
import { useNavigation } from "@react-navigation/native";
import searchResults_store from "../../zustand/searchResults_store.js";

const { width } = Dimensions.get("window");

export default function SearchResults() {
  // main vars
  let { searchResults } = searchResults_store((state) => state);
  //
  return (
    <>
      <SafeAreaView style={tw`${globalStyles.safe_area_container} p-1`}>
        <ScrollView
          contentContainerStyle={tw`${searchresultsStyles.container}`}
        >
          {searchResults.map((e, i) => {
            return <RendedItem key={i} watch={e} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const RendedItem = ({ watch }) => {
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
};
