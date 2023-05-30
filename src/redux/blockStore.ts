import { BigNumber, Block, BlockWithTransactions } from "alchemy-sdk";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const useBearStore = create(
  combine({ bears: 0 }, (set) => ({
    increase: (by: number) => set((state) => ({ bears: state.bears + by })),
  }))
);

const useBearStore2 = create(
  combine({ blocks: [] }, (set) => ({
    increase: (by: number) => set((state) => ({})),
  }))
);
