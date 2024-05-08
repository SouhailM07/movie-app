import { create } from "zustand";

const loading_store = create((set) => ({
    loading: false,
    editLoading: (st) => set({ loading: st })
}))

export default loading_store