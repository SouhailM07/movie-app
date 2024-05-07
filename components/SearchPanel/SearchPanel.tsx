import { searchpanelStyles } from "./searchpanelStyles.ts";
import { globalStyles } from "../../globalStyles.ts";
import {
  Text,
  View,
  FlatList,
  Dimensions,
  TextInput,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
//
import tw from "../../lib/tailwind.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import selectedContent_store from "../../zustand/selectedContent_store.js";
import searchResults_store from "../../zustand/searchResults_store.js";
// assets
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const { width } = Dimensions.get("window");

/*===============================================================================================*/
// main component section
/*===============================================================================================*/

export default function SearchPanel() {
  // main vars
  let [searchTxt, setSearchTxt] = useState<string>("");
  let { searchResults, editSearchResults } = searchResults_store(
    (state) => state
  );
  const BASE_URL = "https://api.themoviedb.org/3/discover/";
  //
  useEffect(() => {
    fetchData({ searchTxt, editSearchResults, BASE_URL });
  }, [searchTxt]);
  //
  return (
    <>
      <SafeAreaView style={tw`${globalStyles.safe_area_container} p-1`}>
        <SearchInput txt={searchTxt} editTxt={setSearchTxt} />
        {/*  */}
        {searchTxt && searchResults.length !== 0 ? (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={searchResults}
            contentContainerStyle={tw`gap-y-[1rem] pb-[6rem] `}
            renderItem={({ item }: { item: any }): any => {
              return <RendedItem watch={item} />;
            }}
          />
        ) : (
          <Text
            style={tw`text-white text-center mt-[5rem] text-[1rem] font-medium`}
          >
            Empty
          </Text>
        )}
      </SafeAreaView>
    </>
  );
}

/*===============================================================================================*/
// small components section
/*===============================================================================================*/

const SearchInput = ({ txt, editTxt }) => {
  // main vars
  let navigation: any = useNavigation();
  // handlers
  const handlePress = () => txt && navigation.navigate("searchResults");
  return (
    <View
      style={tw` border-2 h-[2.8rem] my-[1rem] border-gray-300 w-[90%] mx-auto rounded-full flex-row justify-between items-center `}
    >
      <TextInput
        style={tw`text-white h-full w-[80%] pl-[1rem] `}
        value={txt}
        onChangeText={(text) => editTxt(text)}
      />
      <TouchableOpacity
        onPress={handlePress}
        style={tw` w-[20%] border-white items-center justify-center`}
      >
        <FontAwesomeIcon icon={faSearch} color="white" />
      </TouchableOpacity>
    </View>
  );
};

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
      style={tw`w-full px-[1rem] mx-auto flex-row gap-x-[1rem] items-center `}
    >
      <Image
        style={tw`rounded-xl aspect-video h-[${(width / 4 / 7) * 1.7}]`}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${watch?.poster_path}`,
        }}
      />
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={tw`text-white font-medium w-[50%] `}
      >
        {watch?.original_title}
        {watch?.original_name}
      </Text>
    </Pressable>
  );
};

/*===============================================================================================*/
// helpers section
/*===============================================================================================*/

const fetchData = async ({ searchTxt, BASE_URL, editSearchResults }) => {
  try {
    const movieRes = await axios.get(
      `${BASE_URL}movie?include_adult=false&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
    );
    const tvRes = await axios.get(
      `${BASE_URL}tv?include_adult=false&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
    );

    const movieArr = movieRes.data.results.filter(
      (e) =>
        e.original_title?.toLowerCase().includes(searchTxt.toLowerCase()) ||
        e.original_name?.toLowerCase().includes(searchTxt.toLowerCase())
    );

    const tvArr = tvRes.data.results.filter(
      (e) =>
        e.original_title?.toLowerCase().includes(searchTxt.toLowerCase()) ||
        e.original_name?.toLowerCase().includes(searchTxt.toLowerCase())
    );

    editSearchResults([...movieArr, ...tvArr]);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
