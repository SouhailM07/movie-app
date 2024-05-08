import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";


const favoriteList_store = create(persist((set) => ({
    favoriteList: [],
    updateFavoriteList: (st) => {
        set((state) => {
            const index = state.favoriteList.indexOf(st);
            if (index !== -1) {
                // If the item is found, remove it
                const newList = state.favoriteList.filter((item) => item !== st);
                return { favoriteList: newList };
            } else {
                // If the item is not found, add it
                return { favoriteList: [...state.favoriteList, st] };
            }
        });
    },
}), { name: "favoriteList_state", storage: createJSONStorage(() => AsyncStorage) }))

export default favoriteList_store