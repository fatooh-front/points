import { Navigate, useLocation } from "react-router-dom";
import useMyPermissionsStore from "../store/permissions/useMyPermissionsStore";

import AppLayout from "@/main/layout/AppLayout/AppLayout";
import PermissionCheck from "@/main/global/providers/permissionCheck/PermissionCheck";
import useAddDirLangHTML from "../hooks/addDirLangHTML/useAddDirLangHTML";
import ErrorBoundary from "./errorBoundary/ErrorBoundary";
import useGetInitialData from "../hooks/data/useGetInitialData";
import Loading from "@/main/common/components/loading/Loading";
import { useInternetConnection } from "../hooks/internetConnection/useInternetConnection";
// import useSocketConnection from "../hooks/socket/useSocketConnection";

export default function AppLayoutProviders() {
  useAddDirLangHTML();
  useInternetConnection();
  // useSocketConnection();

  const { pathname } = useLocation();
  const permissions = useMyPermissionsStore((store) => store.permissions);
  console.log("qqq", permissions);
  if (false) {
    return <Navigate to="/auth/login" />;
  }

  const { isLoading } = useGetInitialData();

  if (isLoading) {
    return <Loading />;
  }

  console.log("pathname11", pathname);
  return (
    <>
      {permissions && (
        <PermissionCheck
          isAdmin={() => true}
          permissions={permissions}
          pathname={pathname}
        >
          <ErrorBoundary>
            <AppLayout />
          </ErrorBoundary>
        </PermissionCheck>
      )}
    </>
  );
}
