import { globalStyles } from "../../globalStyles.ts";
import {
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  SafeAreaView,
} from "react-native";
import { selectedcontentStyles } from "./selectedcontentStyles.ts";
import tw from "../../lib/tailwind.js";
import selectedContent_store from "../../zustand/selectedContent_store.js";
import axios from "axios";
import { useState, useEffect } from "react";
// ? types
import { btnsPanel_t } from "../../types/index.ts";
// assets
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheck,
  faCircle,
  faHeart,
  faPlay,
  faPlus,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import watchList_store from "../../zustand/watchList_store.js";

/*==============================================================================================*/
// main component section
/*==============================================================================================*/

export default function SelectedContent() {
  // main vars
  let { selectedContent } = selectedContent_store((state) => state);
  let [contentApi, setContentApi]: any = useState({});
  const {
    backdrop_path,
    original_name,
    original_title,
    overview,
    genres,
    release_date,
    vote_average,
    popularity,
    runtime,
    id,
  } = contentApi;
  //
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${selectedContent}?include_adult=false?&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
      )
      .then((res) => setContentApi(res.data))
      .catch((err) => console.log(`err:${err}`));
  }, []);
  return (
    <>
      <SafeAreaView style={tw`${globalStyles.safe_area_container}`}>
        <ScrollView contentContainerStyle={tw`pb-[1rem]`}>
          <ContentBackground bg={backdrop_path} />
          <View style={tw`px-2 gap-y-4`}>
            <ContentTitle title1={original_name} title2={original_title} />
            <ContentGenres genres={genres} />
            <Text style={tw`text-white leading-[1.4rem]`}>{overview}</Text>
            <Details
              release_date={release_date}
              runtime={runtime}
              vote_average={vote_average}
              popularity={popularity}
            />
            <ContentTrailerBtn />
            <ContentBtnsPanel contentId={id} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

/*==============================================================================================*/
// small components section
/*==============================================================================================*/

const Details = ({ release_date, vote_average, runtime, popularity }) => {
  return (
    <View style={tw`flex-row justify-between items-center `}>
      <View style={tw`gap-y-[0.5rem]`}>
        <Text style={tw`text-white font-bold`}>
          Release date: {release_date}
        </Text>
        <Text style={tw`text-white font-bold`}>popularity : {popularity}</Text>
        <Text style={tw`text-white font-bold`}>duration: {runtime}</Text>
      </View>
      <VoteAverage vote_average={vote_average} />
    </View>
  );
};

const VoteAverage = ({ vote_average }) => {
  return (
    <View
      style={tw`border-4 border-green-400 p-2 bg-slate-700 w-[3.5rem] aspect-square rounded-full items-center justify-center`}
    >
      <Text style={tw`text-white font-bold text-[1rem]`}>
        {(vote_average * 10).toFixed(0)}%
      </Text>
    </View>
  );
};

const ContentGenres = ({ genres }) => {
  return (
    <View style={tw`flex-row gap-x-[1rem]`}>
      {genres?.map(({ name }, i) => {
        return (
          <View key={i} style={tw`flex-row items-center gap-x-[0.5rem]`}>
            <FontAwesomeIcon icon={faCircle} color="white" size={7} />
            <Text style={tw`text-white text-[1rem] font-medium`}>{name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const ContentBackground = ({ bg }) => {
  return (
    <Image
      style={tw`w-full aspect-video`}
      source={{
        uri: `https://image.tmdb.org/t/p/w500${bg}`,
      }}
    />
  );
};

const ContentTitle = ({ title1, title2 }) => {
  return (
    <Text style={tw`${selectedcontentStyles.ContentTitle}`}>
      {title1 || title2}
    </Text>
  );
};

const ContentTrailerBtn = () => {
  return (
    <TouchableOpacity
      style={tw`${selectedcontentStyles.ContentTrailerBtn_btn}`}
    >
      <Text style={tw`text-white text-[1rem] font-medium `}>Watch Trailer</Text>
    </TouchableOpacity>
  );
};

const ContentBtnsPanel = ({ contentId }) => {
  // ! handlers
  let { watchList, updateWatchList } = watchList_store((state) => state);

  //
  const btnsPanel: btnsPanel_t[] = [
    { icon: faPlay, label: "play", color: "#4ADE80", handler: () => {} },
    {
      icon: !watchList.includes(contentId) ? faPlus : faCheck,
      label: "list",
      color: "#fff",
      handler: updateWatchList,
    },
    { icon: faShare, label: "share", color: "#EAB308", handler: () => {} },
    { icon: faHeart, label: "like", color: "#EF4444", handler: () => {} },
  ];
  return (
    <View style={tw`${selectedcontentStyles.ContentBtnsPanel_container}`}>
      {btnsPanel.map(({ icon, label, color, handler }, i) => (
        <TouchableOpacity
          onPress={() => handler(contentId)}
          key={i}
          style={tw` items-center gap-y-[1rem]`}
        >
          <View style={tw`border border-[${color!}] rounded-lg p-4`}>
            <FontAwesomeIcon icon={icon} color={color!} />
          </View>
          <Text style={tw`text-white text-[1rem] capitalize`}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
