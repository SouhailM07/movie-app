import { create } from "zustand";


const searchResults_store = create((set) => (({
    searchResults: [],
    editSearchResults: (st) => set({ searchResults: st })
})))

export default searchResults_store;