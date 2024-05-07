import { create } from "zustand";

const selectedContent_store = create((set) => (({
    selectedContent: {},
    editSelectedContent: (st) => set({ selectedContent: st })
})))

export default selectedContent_store