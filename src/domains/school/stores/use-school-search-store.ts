import { create } from "zustand";

type TSchoolSearchStore = {
  query: string;
  setQuery: (query: string) => void;
};

export const useSchoolSearchStore = create<TSchoolSearchStore>()((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));
