import { globalStyles } from "../../globalStyles.ts";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { selectedcontentStyles } from "./selectedcontentStyles.ts";
import tw from "../../lib/tailwind.js";
import selectedContent_store from "../../zustand/selectedContent_store.js";
// ? types
import { btnsPanel_t } from "../../types/index.ts";
// assets
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHeart,
  faPlay,
  faPlus,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

/*==============================================================================================*/
// main component section
/*==============================================================================================*/

export default function SelectedContent() {
  // main vars
  let { selectedContent } = selectedContent_store((state) => state);
  const { backdrop_path, original_name, original_title, overview } =
    selectedContent;
  //
  return (
    <>
      <SafeAreaView style={tw`${globalStyles.safe_area_container}`}>
        <ContentBackground bg={backdrop_path} />
        <View style={tw`px-2 gap-y-4`}>
          <ContentTitle title1={original_name} title2={original_title} />
          <Text style={tw`text-white leading-[1.4rem]`}>{overview}</Text>
          <ContentTrailerBtn />
          <ContentBtnsPanel />
        </View>
      </SafeAreaView>
    </>
  );
}

/*==============================================================================================*/
// small components section
/*==============================================================================================*/

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

const ContentBtnsPanel = () => {
  const btnsPanel: btnsPanel_t[] = [
    { icon: faPlay, label: "play", color: "#4ADE80" },
    { icon: faPlus, label: "list", color: "#fff" },
    { icon: faShare, label: "share", color: "#EAB308" },
    { icon: faHeart, label: "like", color: "#EF4444" },
  ];
  return (
    <View style={tw`${selectedcontentStyles.ContentBtnsPanel_container}`}>
      {btnsPanel.map(({ icon, label, color }, i) => (
        <TouchableOpacity key={i} style={tw` items-center gap-y-[1rem]`}>
          <View style={tw`border border-[${color!}] rounded-lg p-4`}>
            <FontAwesomeIcon icon={icon} color={color!} />
          </View>
          <Text style={tw`text-white text-[1rem] capitalize`}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
