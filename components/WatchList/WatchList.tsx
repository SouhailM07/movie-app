import { SafeAreaView, ScrollView } from "react-native";
import { globalStyles } from "../../globalStyles.ts";
import { watchlistStyles } from "./watchlistStyles.ts";
import tw from "../../lib/tailwind.js";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
// components
import Ywatching from "../Ywatching/Ywatching.tsx";
// zustand stores
import loading_store from "../../zustand/loading_store.js";
import watchList_store from "../../zustand/watchList_store.js";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/

export default function WatchList() {
  // main states
  const BASE_URL = "https://api.themoviedb.org/3/discover/";
  let [content, setContent]: any = useState([]);
  const { editLoading } = loading_store((state) => state);
  let { watchList } = watchList_store((state) => state);
  //
  useLayoutEffect(() => {
    getData({ BASE_URL, editLoading, setContent, watchList });
  }, [watchList]);
  //
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

const getData = async ({ editLoading, watchList, setContent, BASE_URL }) => {
  editLoading(true);
  await fetchData({ watchList, setContent, BASE_URL });
  editLoading(false);
};
