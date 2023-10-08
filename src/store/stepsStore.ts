import { create } from "zustand";

interface StepStore {
  activeStep: number;
  slides: any[];
  setActiveStep: (step: number) => void;
  setSlides: (slides: any[]) => void;
}

// Global State store
export const useStepStore = create<StepStore>((set) => ({
  activeStep: 0,
  slides: [],
  setActiveStep: (step) => set({ activeStep: step }),
  setSlides: (slides) => set({ slides }),
}));
