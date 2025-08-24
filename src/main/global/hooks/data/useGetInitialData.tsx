import { useEffect } from "react";
import { useAuth } from "../../store/auth/useAuth";
import { useGetProfile } from "../../api/restful/userManagmentAPI/usersManager/useUsersQuery";
import { useGetMyPermission } from "../../api/restful/userManagmentAPI/permissionManager/usePermissionsQuery";
import { useGetAllSettings } from "../../api/restful/userManagmentAPI/settingsManager/useSettingsQuery";
import { isAdmin } from "../../utils/permissions/hasPermission";
import useMyPermissionsStore from "../../store/permissions/useMyPermissionsStore";
import useSettingsStore from "../../store/settings/useSettingsStore";
import useMyProfileStore from "../../store/profile/useMyProfileStore";

const useGetInitialData = () => {
  const { token } = useAuth((state) => state);
  const setPermissions = useMyPermissionsStore((store) => store.setPermissions);
  const setSettings = useSettingsStore((store) => store.setSettings);
  const setProfile = useMyProfileStore((store) => store.setProfile);

  const {
    data: dataProfile,
    isLoading: isLoadingProfile,
    // error: errorProfile,
  } = useGetProfile("profile");

  useEffect(() => {
    setProfile({ data: dataProfile?.data });
  }, [dataProfile, setProfile]);

  const {
    data: dataMyPermission,
    isLoading: isLoadingMyPermission,
    // error: errorMyPermission,
  } = useGetMyPermission("portal", !!token);
  // for test

  // const dataMyPermission = useMemo(
  //   () => ({
  //     data: {
  //      _id: "66e80acc3ecb41c6de379588",
  //      "group": [
  //          "GET",
  //          "POST",
  //          "DELETE",
  //          "PATCH",
  //          "DATA"
  //      ],
  //      "orgCategory": [
  //          "GET",
  //          "POST",
  //          "DELETE",
  //          "PATCH"
  //      ],
  //      "orgRegion": [
  //          "GET",
  //          "POST",
  //          "DELETE",
  //          "PATCH"
  //      ],
  //      "portalPermission": [
  //          "GET",
  //          "POST",
  //          "DELETE",
  //          "PATCH",
  //          "DATA"
  //      ],
  //      "setting": [
  //          "GET",
  //          "POST",
  //          "DELETE",
  //          "PATCH"
  //      ],
  //      "user": [
  //          "GET",
  //          "POST",
  //          "DELETE",
  //          "PATCH",
  //          "DATA"
  //      ]
  //     },
  //   }),
  //   []
  // );

  console.log("dataMyPermission11", dataMyPermission);

  const {
    data: dataSettings,
    isLoading: isLoadingSettings,
    // error: errorSettings,
  } = useGetAllSettings({}, true);

  useEffect(() => {
    const permissionsData = dataMyPermission?.data;
    if (permissionsData) {
      permissionsData.models = ["GET", "POST", "DELETE", "PATCH", "DATA"];
      permissionsData.cars = ["GET", "POST", "DELETE", "PATCH", "DATA"];
      permissionsData.logs = ["GET", "POST", "DELETE", "PATCH", "DATA"];
      permissionsData.license = ["GET", "POST", "DELETE", "PATCH", "DATA"];
    }

    setPermissions({
      data: permissionsData,
    });
  }, [dataMyPermission, setPermissions, isAdmin]);

  useEffect(() => {
    setSettings({ data: dataSettings?.data });
  }, [dataSettings, setSettings]);

  console.log(isLoadingMyPermission, isLoadingProfile, isLoadingSettings);

  return {
    isLoading: false,
  };
};

export default useGetInitialData;
