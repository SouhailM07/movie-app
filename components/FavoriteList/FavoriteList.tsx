import { SafeAreaView, ScrollView } from "react-native";
import { globalStyles } from "../../globalStyles.ts";
import { favoritelistStyles } from "./favoritelistStyles.ts";
import tw from "../../lib/tailwind.js";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
// zustand
import loading_store from "../../zustand/loading_store.js";
import favoriteList_store from "../../zustand/favoriteList_store.js";
import Ywatching from "../Ywatching/Ywatching.tsx";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/

export default function FavoriteList() {
  // main states
  let { favoriteList } = favoriteList_store((state) => state);
  let [content, setContent]: any = useState([]);
  const { editLoading } = loading_store((state) => state);
  const BASE_URL = "https://api.themoviedb.org/3/discover/";
  //
  useLayoutEffect(() => {
    getData({ setContent, editLoading, BASE_URL, favoriteList });
  }, [favoriteList]);
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
// ! global handlers
/*===============================================================================================*/

const fetchData = async ({ favoriteList, BASE_URL, setContent }) => {
  try {
    const movieRes = await axios.get(
      `${BASE_URL}movie?include_adult=false&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
    );
    const tvRes = await axios.get(
      `${BASE_URL}tv?include_adult=false&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
    );
    const movieArr = movieRes.data.results.filter((e) =>
      favoriteList.includes(e.id)
    );

    const tvArr = tvRes.data.results.filter((e) => favoriteList.includes(e.id));

    setContent([...movieArr, ...tvArr]);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

const getData = async ({ editLoading, favoriteList, setContent, BASE_URL }) => {
  editLoading(true);
  await fetchData({ favoriteList, setContent, BASE_URL });
  editLoading(false);
};
