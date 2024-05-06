import {
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { seemoreStyles } from "./seemoreStyles.ts";
import tw from "../../lib/tailwind.js";
//
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
import seeMore_store from "../../zustand/seeMore_store.js";

export default function SeeMore() {
  // main states
  let [content, setContent]: any = useState([]);
  const navigation: any = useNavigation();
  let { editSelectedMoreContent, selectedMoreContent } = seeMore_store(
    (state) => state
  );
  const { apiUrl } = selectedMoreContent;
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
      <SafeAreaView style={tw`min-h-full  w-full bg-slate-800 px-2`}>
        <ScrollView
          contentContainerStyle={tw`min-w-full min-h-[19rem] my-[1rem] flex-row flex-wrap gap-y-[1rem] gap-x-[0.8rem] justify-between`}
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
  return (
    <View style={tw`w-[${width / 4 / 3.5}] `}>
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
    </View>
  );
};