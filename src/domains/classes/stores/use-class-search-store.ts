import { create } from "zustand";

type TClassSearchStore = {
  query: string;
  setQuery: (query: string) => void;
};

export const useClassSearchStore = create<TClassSearchStore>()((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
