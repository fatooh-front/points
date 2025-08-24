import { AllPermissionEnum } from "./permissions";

export type FilesInfo = { [key: string]: { file: File; href: string } };

export type GetPermission = {
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  status: true;
  serial: number;
  created_at: string;
  updated_at: string;
  __v: number;
};

export type GetPermissionLooKUp = {
  _id: string;
  firstName: string;
  lastName: string;
};

export type GetPermissionsLookUp = {
  num: number;
  data: GetPermissionLooKUp[];
};

export type GetPermissions = {
  result: number;
  pages: number;
  data: GetPermission[];
};

export type UserPermission = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  status?: boolean;
  id?: string;
};

export type GroupUserPermission = {
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  id: string;
};

export type GroupPermission = {
  _id: string;
  name: string;
  users: GroupUserPermission[];
  id: string;
};

export type PermissionRowType = AllPermissionEnum[];
type MethodPermission = (
  | "GET"
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"
  | "DATA"
)[];

// "group"
// "orgCategory"
// "orgRegion"
// "portalPermission"
// "user"
export type GetPermissionByIdProps = {
  [key: string]: any;
};

export type GetPermissionById = {
  data: GetPermissionByIdProps;
};

export type UpdatePermission = {
  [key: string]: MethodPermission;
};

export type AddPermissionToGroup = {
  groupId: string;
};
export type AddPermissionToUser = {
  user: string;
};

export type UpdateProfile = {
  name: string;
  city: string;
  address: string;
};

export type PermissionDialogProps = {
  permission: GetPermission;
  type?: string;
};
