import { create } from 'zustand';

interface MorphState {
  morphWeights: number[];
  updateMorph: (index: number, value: number) => void;
  resetMorphs: () => void;
}

export const useStore = create<MorphState>((set) => ({
  morphWeights: new Array(10).fill(0), // e.g., height, limbs, etc.
  updateMorph: (index, value) => set((state) => ({ morphWeights: state.morphWeights.map((w, i) => i === index ? value : w) })),
  resetMorphs: () => set({ morphWeights: new Array(10).fill(0) })
}));

interface TrainingState {
  runId: string;
  startTraining: (config: any) => Promise<any>;
}

export const useTrainingStore = create<TrainingState>((set, get) => ({
  runId: '',
  startTraining: async (config) => {
    const result = await window.api.startTraining(config);
    set({ runId: result.runId });
    return result;
  }
}));