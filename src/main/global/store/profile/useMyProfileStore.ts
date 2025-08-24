import { create } from "zustand";

interface LicenseStoreState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profile: any;
  getProfile: () => any;
  setProfile: ({
    data,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any | undefined;
  }) => void;
  clearProfile: () => void;
  getLicensesArray: () => any;
  getLicensesArrayActive: () => any;
}

const useMyProfileStore = create<LicenseStoreState>((set) => ({
  profile: {},
  getProfile: () => {
    const { profile } = useMyProfileStore.getState();
    return profile;
  },
  getLicensesArray: () => {
    const { profile } = useMyProfileStore.getState();
    return Object.keys(profile?.license || {}) || [];
  },
  getLicensesArrayActive: () => {
    const { profile } = useMyProfileStore.getState();
    return (
      Object.keys(profile?.license || {}).filter(
        (el) => profile?.license?.[el].status === "active"
      ) || []
    );
  },
  setProfile: ({ data }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return set((_state) => ({
      profile: data || {},
    }));
  },
  clearProfile: () => set({ profile: {} }),
}));

export default useMyProfileStore;
