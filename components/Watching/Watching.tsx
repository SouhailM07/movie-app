import {
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { watchingStyles } from "./watchingStyles.ts";
import tw from "../../lib/tailwind.js";
//
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
import seeMore_store from "../../zustand/seeMore_store.js";
import selectedContent_store from "../../zustand/selectedContent_store.js";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/
// * this is a component to render the deferent categories like popular and top rated with content
// [start]

export default function Watching({ title, apiUrl }) {
  // main states
  let [content, setContent]: any = useState([]);
  const navigation: any = useNavigation();
  let { editSelectedMoreContent, selectedMoreContent } = seeMore_store(
    (state) => state
  );
  //
  useEffect(() => {
    axios["get"](
      `https://api.themoviedb.org/3/${apiUrl}?include_adult=false?&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
    )
      ["then"]((res) => setContent(res.data.results))
      ["catch"]((err) => console.log(`err:${err}`));
  }, []);
  return (
    <>
      <View style={tw`min-w-full min-h-[19rem]`}>
        <View
          style={tw`mb-[1rem] mx-[0.6rem] flex-row justify-between items-center`}
        >
          <Text style={tw`text-white  text-[1.3rem] font-medium `}>
            {title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              editSelectedMoreContent({ title, apiUrl });
              // console.log(selectedMoreContent);
              navigation.navigate("seeMore");
            }}
          >
            <Text style={tw`text-red-500 font-medium`}>See more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={content}
          horizontal
          renderItem={({ item }: { item: any }): any => {
            return <RendedItem watch={item} />;
          }}
        />
      </View>
    </>
  );
}
const RendedItem = ({ watch }) => {
  const navigation: any = useNavigation();
  let { editSelectedContent } = selectedContent_store((state) => state);
  const handlePress = () => {
    editSelectedContent(watch);
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
};
