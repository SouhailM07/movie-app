import {
  Dimensions,
  Image,
  Pressable,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { watchlistStyles } from "./watchlistStyles.ts";
import tw from "../../lib/tailwind.js";
import watchList_store from "../../zustand/watchList_store.js";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import selectedContent_store from "../../zustand/selectedContent_store.js";
const { width } = Dimensions.get("window");
export default function WatchList() {
  let { watchList } = watchList_store((state) => state);
  // main states
  let [content, setContent]: any = useState([]);
  //
  const BASE_URL = "https://api.themoviedb.org/3/discover/";
  useEffect(() => {
    fetchData({ watchList, setContent, BASE_URL });
  }, [watchList]);
  return (
    <>
      <SafeAreaView style={tw`min-h-full  w-full bg-slate-800 px-2`}>
        <ScrollView
          contentContainerStyle={tw`min-w-full pb-[2rem] my-[1rem] flex-row flex-wrap gap-y-[1rem] gap-x-[0.8rem] justify-between`}
        >
          {content.map((e, i) => {
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

const fetchData = async ({ watchList, BASE_URL, setContent }) => {
  try {
    const movieRes = await axios.get(
      `${BASE_URL}movie?include_adult=false&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
    );
    const tvRes = await axios.get(
      `${BASE_URL}tv?include_adult=false&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
    );
    const movieArr = movieRes.data.results.filter((e) =>
      watchList.includes(e.id)
    );

    const tvArr = tvRes.data.results.filter((e) => watchList.includes(e.id));

    setContent([...movieArr, ...tvArr]);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
