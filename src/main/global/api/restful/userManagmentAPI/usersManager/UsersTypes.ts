import { Group } from "../../../graphql/groups/GroupsTypes";

export type Attachment = {
  name: string;
  url: string;
};
export type AddAttachment = FormData;
export type Attachments = Attachment[];

export type FilesInfo = { [key: string]: { file: File; href: string } };

export type Organization = {
  _id?: string;
  id?: string;
  company: string;
  orgName?: string;
  name_en?: string;
  name_ar?: string;
  address?: string;
  region?: {
    id: string;
    name: string;
  };
  category?: {
    id: string;
    name: string;
  };
};

export type LicenseStatus = {
  status?: "active" | "expired" | "pending";
  forever?: boolean;
  startDate?: string | Date;
  endDate?: string | Date;
};

export type License = {
  donation?: LicenseStatus;
  chat?: LicenseStatus;
  financial?: LicenseStatus;
  hr?: LicenseStatus;
  workflow?: LicenseStatus;
  [key: string]: any;
};

export type GetUser = {
  _id: string;
  firstName: string;
  lastName: string;
  type: string;
  email: string;
  phone: string;
  phoneCode: string;
  country: string;
  isOrganization: boolean;
  organization?: Organization;
  status: boolean;
  verified: boolean;
  serial: number;
  picture: string;
  company: string | { name_en: string; name_ar: string };
  license: License;
  accountAdmin: string;
  created_at: string;
  city?: string;
  is_employee?: boolean;
  workflowAdmin?: boolean;
  parent: {
    _id: string;
    firstName: string;
    lastName: string;
    parent: null;
    organization: null;
    email: string;
    picture: string;
  };
  __v: number;
};

export type GetUserLooKUp = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type GetUsersLookUp = {
  num: number;
  data: GetUserLooKUp[];
};

export type GetUsers = {
  result: number;
  total: number;
  pages: number;
  data: GetUser[];
};

export type GetUserById = {
  data: {
    userInfo: GetUser;
    companies: GetUser[];
    groups: Group[];
    users: GetUser[];
  };
  type?: string;
};
export type GetUserProfile = {
  data: GetUser;
  type?: string;
};

export type AddUser = FormData;

export type UpdateProfile = {
  name: string;
  city: string;
  address: string;
};

export type UpdateUserLicense = LicenseStatus & { license: string };

export type UserDialogProps = {
  user: GetUser;
  type?: string;
};

export type UpdateUserPasswordType = {
  password: string;
  passwordConfirm: string;
};
