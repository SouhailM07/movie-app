import { ActivityIndicator, Modal, View } from "react-native";
import { loadingStyles } from "./loadingStyles.ts";
import tw from "../../lib/tailwind.js";
// zustand store
import loading_store from "../../zustand/loading_store.js";

export default function Loading() {
  const { loading } = loading_store((state) => state);

  return (
    <Modal visible={loading} transparent animationType="fade">
      <View style={tw`${loadingStyles.container}`}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </Modal>
  );
}
