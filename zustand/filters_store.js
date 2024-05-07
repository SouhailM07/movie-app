import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware"

const filters_store = create(persist((set) => ({
    en: false,
    includingVideo: false,
    editEn: (st) => set({ en: st }),
    editIncludingVideo: (st) => set({ includingVideo: st })
}), { name: "search_filters", storage: createJSONStorage(() => AsyncStorage) }))

export default filters_store;