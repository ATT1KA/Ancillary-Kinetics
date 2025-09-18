import { create } from 'zustand';
export const useStore = create((set) => ({
    morphWeights: new Array(10).fill(0), // e.g., height, limbs, etc.
    updateMorph: (index, value) => set((state) => ({ morphWeights: state.morphWeights.map((w, i) => i === index ? value : w) })),
    resetMorphs: () => set({ morphWeights: new Array(10).fill(0) })
}));
export const useTrainingStore = create((set, get) => ({
    runId: '',
    startTraining: async (config) => {
        const result = await window.api.startTraining(config);
        set({ runId: result.runId });
        return result;
    }
}));
