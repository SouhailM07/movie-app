import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { watchingStyles } from "./watchingStyles.ts";
import tw from "../../lib/tailwind.js";
//
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
// components
import Vwatching from "../Vwatching/Vwatching.tsx";
// zustand stores
import seeMore_store from "../../zustand/seeMore_store.js";
import filters_store from "../../zustand/filters_store.js";
import loading_store from "../../zustand/loading_store.js";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/
// * this is a component to render the deferent categories like popular and top rated with content

export default function Watching({ title, apiUrl }) {
  // main states
  let [content, setContent]: any = useState([]);
  const { editLoading } = loading_store((state) => state);
  let { en, includingVideo } = filters_store((state) => state);
  //
  useEffect(() => {
    getData({ en, includingVideo, editLoading, apiUrl, setContent });
  }, [en, includingVideo]);
  //
  return (
    <>
      <View style={[tw`min-w-full min-h-[19rem]`]}>
        <Header title={title} apiUrl={apiUrl} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={content}
          horizontal
          renderItem={({ item }: { item: any }): any => {
            return <Vwatching watch={item} />;
          }}
        />
      </View>
    </>
  );
}

/*===============================================================================================*/
// small components
/*===============================================================================================*/
const Header = ({ title, apiUrl }) => {
  // main vars
  const navigation: any = useNavigation();
  let { editSelectedMoreContent } = seeMore_store((state) => state);
  // ! handlers
  const handlePress = () => {
    editSelectedMoreContent({ title, apiUrl });
    navigation.navigate("seeMore");
  };
  return (
    <View
      style={tw`mb-[1rem] mx-[0.6rem] flex-row justify-between items-center`}
    >
      <Text style={tw`text-white  text-[1.3rem] font-medium `}>{title}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={tw`text-red-500 font-medium`}>See more</Text>
      </TouchableOpacity>
    </View>
  );
};
/*===============================================================================================*/
// ! main handlers
/*===============================================================================================*/

const getData = ({ apiUrl, includingVideo, en, setContent, editLoading }) => {
  editLoading(true);
  axios["get"](
    `https://api.themoviedb.org/3/${apiUrl}?include_adult=false&include_video=${includingVideo}${
      en && "&language=en-US"
    }?&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
  )
    ["then"]((res) => {
      setContent(res.data.results);
      editLoading(false);
    })
    ["catch"]((err) => console.log(`err:${err}`));
};
