import { create } from "zustand";

interface ActiveBudgetStore {
  activeBudget: {
    name: string;
    limit: number;
    amount: number;
  } | null;
  setActiveBudget: (
    activeBudget: {
      name: string;
      limit: number;
      amount: number;
    } | null,
  ) => void;
}

const useActiveBudgetStore = create<ActiveBudgetStore>((set) => ({
  activeBudget: null,
  setActiveBudget: (activeBudget) => set({ activeBudget }),
}));

export default useActiveBudgetStore;
