import { Image, Text, TouchableOpacity, View } from "react-native";
import { selectedcontentStyles } from "./selectedcontentStyles.ts";
import tw from "../../lib/tailwind.js";
import selectedContent_store from "../../zustand/selectedContent_store.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlay,
  faPlus,
  faShare,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { btnsPanel_t } from "../../types/index.ts";

export default function SelectedContent() {
  const btnsPanel: btnsPanel_t[] = [
    { icon: faPlay, label: "play" },
    { icon: faPlus, label: "list" },
    { icon: faShare, label: "share" },
  ];
  let { selectedContent } = selectedContent_store((state) => state);

  const { backdrop_path, original_name, original_title, overview } =
    selectedContent;
  return (
    <>
      <SafeAreaView style={tw`min-h-full  w-full bg-slate-800`}>
        <Image
          style={tw`w-full aspect-video `}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${backdrop_path}`,
          }}
        />
        <View style={tw`px-2 gap-y-4`}>
          <Text style={tw`text-white text-[1.4rem] font-medium mt-3`}>
            {original_name || original_title}
          </Text>
          <Text style={tw`text-white  leading-[1.4rem]`}>{overview}</Text>
          <TouchableOpacity
            style={tw`bg-orange-500 rounded-full h-[3rem]  mx-auto items-center justify-center w-full`}
          >
            <Text style={tw`text-white text-[1rem] font-medium `}>
              Watch Trailer
            </Text>
          </TouchableOpacity>
          <View
            style={tw`flex-row items-center w-[17rem] justify-between mx-auto mt-[1rem]`}
          >
            {btnsPanel.map(({ icon, label }, i) => (
              <TouchableOpacity key={i} style={tw`items-center gap-y-[1rem]`}>
                <View style={tw`border border-white rounded-lg p-4`}>
                  <FontAwesomeIcon icon={icon} color="white" />
                </View>
                <Text style={tw`text-white text-[1rem]`}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
