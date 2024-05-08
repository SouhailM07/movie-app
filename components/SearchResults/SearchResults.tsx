import { SafeAreaView, ScrollView } from "react-native";
import { searchresultsStyles } from "./searchresultsStyles.ts";
import { globalStyles } from "../../globalStyles.ts";
import tw from "../../lib/tailwind.js";
// components
import searchResults_store from "../../zustand/searchResults_store.js";
// zustand stores
import Ywatching from "../Ywatching/Ywatching.tsx";

/*===============================================================================================*/
// main component section
/*===============================================================================================*/

export default function SearchResults() {
  // main vars
  let { searchResults } = searchResults_store((state) => state);
  //
  return (
    <>
      <SafeAreaView style={tw`${globalStyles.safe_area_container} p-1`}>
        <ScrollView contentContainerStyle={tw`${globalStyles.scrollContainer}`}>
          {searchResults.map((e, i) => {
            return <Ywatching key={i} watch={e} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
