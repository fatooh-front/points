import { checkPermission } from "@/main/global/utils/permissions/permissions";
import { Navigate } from "react-router-dom";

interface Permissions {
  [key: string]: string[];
}

interface PermissionCheckProps {
  isAdmin: () => boolean;
  permissions: Permissions | undefined;
  pathname: string;
  children: React.ReactNode;
}

const PermissionCheck: React.FC<PermissionCheckProps> = ({
  isAdmin: _isAdmin,
  permissions,
  pathname,
  children,
}) => {
  // if (isAdmin()) {
  //   return <>{children}</>;
  // }

  if (
    permissions &&
    Object.keys(permissions).length > 0 &&
    !checkPermission(permissions, pathname) &&
    pathname !== "/"
  ) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
export default PermissionCheck;
