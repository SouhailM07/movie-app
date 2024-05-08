import { SafeAreaView, ScrollView } from "react-native";
import { seemoreStyles } from "./seemoreStyles.ts";
import tw from "../../lib/tailwind.js";
//
import axios from "axios";
import { useState, useEffect } from "react";
// components
import Ywatching from "../Ywatching/Ywatching.tsx";
// zustand stores
import seeMore_store from "../../zustand/seeMore_store.js";
import filters_store from "../../zustand/filters_store.js";
import loading_store from "../../zustand/loading_store.js";
import { globalStyles } from "../../globalStyles.ts";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/

export default function SeeMore() {
  // main states
  let [content, setContent]: any = useState([]);
  let { selectedMoreContent } = seeMore_store((state) => state);
  let { en, includingVideo } = filters_store((state) => state);
  const { editLoading } = loading_store((state) => state);
  const { apiUrl } = selectedMoreContent;
  //
  useEffect(() => {
    getData({ editLoading, apiUrl, en, includingVideo, setContent });
  }, []);
  return (
    <>
      <SafeAreaView style={tw`${globalStyles.safe_area_container} px-2`}>
        <ScrollView contentContainerStyle={tw`${globalStyles.scrollContainer}`}>
          {content.map((e, i) => {
            return <Ywatching key={i} watch={e} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

/*===============================================================================================*/
// ! main handlers
/*===============================================================================================*/

const getData = ({ editLoading, setContent, apiUrl, includingVideo, en }) => {
  editLoading(true);
  axios["get"](
    `https://api.themoviedb.org/3/${apiUrl}?include_adult=false?&include_video=${includingVideo}${
      en && "&language=en-US"
    }&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
  )
    ["then"]((res) => {
      setContent(res.data.results);
      editLoading(false);
    })
    ["catch"]((err) => console.log(`err:${err}`));
};
