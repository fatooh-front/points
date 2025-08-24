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

export type GetBrand = {
  brandId?: number | string | null;
  logo?: string | null;
  arabicName: string;
  brandName: string;
  notes?: string | null;
};

export type GetBrandsLooKUp = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type GetBrandsLookUp = {
  num: number;
  data: GetBrandsLooKUp[];
};

export type GetBrands = {
  result: number;
  total: number;
  pages: number;
  data: GetBrand[];
};

export type GetBrandsById = {
  data: {
    userInfo: GetBrand;
    companies: GetBrand[];
    groups: Group[];
    users: GetBrand[];
  };
  type?: string;
};
export type GetBrandsProfile = {
  data: GetBrand;
  type?: string;
};

export type AddBrands = GetBrand;

export type UpdateProfile = {
  name: string;
  city: string;
  address: string;
};

export type UpdateBrandsLicense = LicenseStatus & { license: string };

export type BrandsDialogProps = {
  Brands: GetBrand;
  type?: string;
};

export type UpdateBrandsPasswordType = {
  password: string;
  passwordConfirm: string;
};
