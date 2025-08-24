import { create } from 'zustand';

import { GetSettingsData } from './SettingsTypes';

interface SettingStoreState {
  getSettings: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings: any;
  getSettingsByName: (name: string) => any;
  setSettings: ({
    data,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: GetSettingsData | undefined;
  }) => void;
  clearSettings: () => void;
}

const useSettingsStore = create<SettingStoreState>((set) => ({
  settings: {},

  getSettings: () => {
    const { settings } = useSettingsStore.getState();
    return settings;
  },
  getSettingsByName: (name: string) => {
    const { settings } = useSettingsStore.getState();
    return (
      Array.isArray(settings) && settings?.find((el: any) => el.name === name)
    );
  },
  setSettings: ({ data }) => {
    return set((_state) => ({
      settings: data || {},
    }));
  },
  clearSettings: () => set({ settings: {} }),
}));

export default useSettingsStore;
