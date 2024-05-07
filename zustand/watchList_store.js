import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
const watchList_store = create(persist((set) => ({
    watchList: [],
    updateWatchList: (st) => {
        set((state) => {
            const index = state.watchList.indexOf(st);
            if (index !== -1) {
                // If the item is found, remove it
                const newList = state.watchList.filter((item) => item !== st);
                return { watchList: newList };
            } else {
                // If the item is not found, add it
                return { watchList: [...state.watchList, st] };
            }
        });
    },
}), { name: "watchList_state", storage: createJSONStorage(() => AsyncStorage) }))

export default watchList_store