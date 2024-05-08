import { globalStyles } from "../../globalStyles.ts";
import { Text, View, Switch, Pressable } from "react-native";
import { sidebarStyles } from "./sidebarStyles.ts";
import tw from "../../lib/tailwind.js";
// ? types
import { arrOfOptions_t } from "../../types/index.ts";
// zustand stores
import filters_store from "../../zustand/filters_store.js";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/

export default function Sidebar() {
  // main vars
  let { en, editEn, includingVideo, editIncludingVideo } = filters_store(
    (state) => state
  );
  const arrOfOptions: arrOfOptions_t[] = [
    { label: "en-US Only", st: en, editSt: editEn },
    {
      label: "Including Video",
      st: includingVideo,
      editSt: editIncludingVideo,
    },
  ];
  //
  return (
    <>
      <View style={tw`${globalStyles.safe_area_container} p-[2rem]`}>
        <Text style={tw`text-white text-[1.4rem] mb-4`}>Filer Options</Text>
        {arrOfOptions.map((e, i) => {
          return <Option key={i} {...e} />;
        })}
      </View>
    </>
  );
}

/*===============================================================================================*/
// small components section
/*===============================================================================================*/

const Option = ({ label, st, editSt }: arrOfOptions_t) => {
  // ! handlers
  const handlePress = () => {
    editSt(!st);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={tw`${sidebarStyles.optionPressable}`}
    >
      <Text style={tw`text-white font-medium text-[1rem] `}>{label}</Text>
      <Switch
        value={st}
        onValueChange={handlePress}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
      />
    </Pressable>
  );
};
