import { create } from "zustand";
import { GetPermissionByIdProps } from "../../utils/permissions/PermissionsTypes";
import { convertObjectToArray, removeKeys } from "../../utils/objectUtils";

interface PermissionStoreState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPermissionMethod: any;
  getPermissions: any;
  getPermissionsArray: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  permissions: any;
  setPermissions: ({
    data,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: GetPermissionByIdProps | undefined;
  }) => void;
  clearPermissions: () => void;
}

const useMyPermissionsStore = create<PermissionStoreState>((set) => ({
  permissions: {},

  getPermissions: () => {
    const { permissions } = useMyPermissionsStore.getState();
    return permissions;
  },
  getPermissionsArray: () => {
    const { permissions } = useMyPermissionsStore.getState();
    return convertObjectToArray(
      removeKeys(permissions, [
        "_id",
        "__v",
        "serial",
        "createdAt",
        "updatedAt",
      ])
    );
  },
  getPermissionMethod: (key: string) => {
    const { permissions } = useMyPermissionsStore.getState();
    console.log("permissions", permissions);

    return permissions?.hasOwnProperty(key) ? permissions[key] : [];
  },
  setPermissions: ({ data }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return set((_state) => ({
      permissions: data || {},
    }));
  },
  clearPermissions: () => set({ permissions: {} }),
}));

export default useMyPermissionsStore;
