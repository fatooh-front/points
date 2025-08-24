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

export type GetCategorie = {
  categoryId?: number | string | null;
  arabicName: string;
  englishName: string;
  deliveryPrice: number;
  notes?: string | null;
};

export type GetCategoriesLooKUp = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type GetCategoriesLookUp = {
  num: number;
  data: GetCategoriesLooKUp[];
};

export type GetCategories = {
  result: number;
  total: number;
  pages: number;
  data: GetCategorie[];
};

export type GetCategoriesById = {
  data: {
    userInfo: GetCategorie;
    companies: GetCategorie[];
    groups: Group[];
    users: GetCategorie[];
  };
  type?: string;
};
export type GetCategoriesProfile = {
  data: GetCategorie;
  type?: string;
};

export type AddCategories = GetCategorie;

export type UpdateProfile = {
  name: string;
  city: string;
  address: string;
};

export type UpdateCategoriesLicense = LicenseStatus & { license: string };

export type CategoriesDialogProps = {
  Categories: GetCategorie;
  type?: string;
};

export type UpdateCategoriesPasswordType = {
  password: string;
  passwordConfirm: string;
};
