import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

const onboarding_store = create(persist((set) => ({
    welcomed: false,
    editWelcomed: () => set({ welcomed: true })
}), { name: "onboarding_state", storage: createJSONStorage(() => AsyncStorage) }))

export default onboarding_store;