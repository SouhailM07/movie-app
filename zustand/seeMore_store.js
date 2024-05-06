import { create } from "zustand";

const seeMore_store = create((set) => (({
    selectedMoreContent: { title: "no" },
    editSelectedMoreContent: (st) => set({ selectedMoreContent: st })
})))

export default seeMore_store