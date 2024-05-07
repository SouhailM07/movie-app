import { Text, View, Switch, Pressable } from "react-native";
import { sidebarStyles } from "./sidebarStyles.ts";
import tw from "../../lib/tailwind.js";
import { globalStyles } from "../../globalStyles.ts";
import { useState } from "react";
export default function Sidebar() {
  interface arrOfOptions_t {
    label: string;
  }
  const arrOfOptions: arrOfOptions_t[] = [
    { label: "en-US Only" },
    { label: "Including Video" },
  ];
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

const Option = ({ label }: { label: string }) => {
  let [toggleOption, setToggleOption] = useState<boolean>(false);
  // ! handlers
  const handlePress = () => {
    setToggleOption(!toggleOption);
  };
  return (
    <Pressable
      onPress={handlePress}
      style={tw`flex-row justify-between items-center w-full `}
    >
      <Text style={tw`text-white font-medium text-[1rem] `}>{label}</Text>
      <Switch
        value={toggleOption}
        onValueChange={handlePress}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
      />
    </Pressable>
  );
};
