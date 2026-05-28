import { create } from 'zustand';
import { getVaultItems, processAudio, initializeEngine } from 'orynd-core';

export interface VaultItem {
  id: string;
  raw_transcript: string;
  intent_type: string;
  title: string;
  due_date: number | null;
  is_completed?: number;
  created_at?: number;
}

interface AppState {
  items: VaultItem[];
  isProcessing: boolean;
  theme: 'dark' | 'light';
  isEngineReady: boolean;
  setTheme: (theme: 'dark' | 'light') => void;
  initApp: () => Promise<void>;
  fetchItems: () => Promise<void>;
  processNewAudio: (audioPath: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  items: [],
  isProcessing: false,
  theme: 'dark', // default to calm dark mode
  isEngineReady: false,

  setTheme: (theme) => set({ theme }),

  initApp: async () => {
    try {
      const ready = await initializeEngine();
      set({ isEngineReady: ready });
      if (ready) {
        await get().fetchItems();
      }
    } catch (e) {
      console.error('Failed to init app', e);
    }
  },

  fetchItems: async () => {
    try {
      const items = await getVaultItems('all');
      set({ items });
    } catch (e) {
      console.error('Failed to fetch items', e);
    }
  },

  processNewAudio: async (audioPath: string) => {
    set({ isProcessing: true });
    try {
      // The background heavy process
      await processAudio(audioPath);
      // Re-fetch to update UI
      await get().fetchItems();
    } catch (e) {
      console.error('Failed to process audio', e);
    } finally {
      set({ isProcessing: false });
    }
  },
}));
