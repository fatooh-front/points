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

export type GetType = {
  typeId?: number | string | null;
  icon: string;
  arabicName: string;
  freeDelivery?: boolean | null | null;
  forbiddenToForeigners?: boolean | null;
  englishName: string;
  notes?: string | null;
};

export type GetTypesLooKUp = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type GetTypesLookUp = {
  num: number;
  data: GetTypesLooKUp[];
};

export type GetTypes = {
  result: number;
  total: number;
  pages: number;
  data: GetType[];
};

export type GetTypesById = {
  data: {
    userInfo: GetType;
    companies: GetType[];
    groups: Group[];
    users: GetType[];
  };
  type?: string;
};
export type GetTypesProfile = {
  data: GetType;
  type?: string;
};

export type AddTypes = GetType;

export type UpdateProfile = {
  name: string;
  city: string;
  address: string;
};

export type UpdateTypesLicense = LicenseStatus & { license: string };

export type TypesDialogProps = {
  Types: GetType;
  type?: string;
};

export type UpdateTypesPasswordType = {
  password: string;
  passwordConfirm: string;
};
