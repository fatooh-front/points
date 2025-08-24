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

export type GetcarsYears = {
  yearId?: string | number | undefined | null;
  year: string;
  notes?: string | null;
};

export type GetcarsYearsLooKUp = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type GetcarsYearssLookUp = {
  num: number;
  data: GetcarsYearsLooKUp[];
};

export type GetcarsYearss = {
  result: number;
  total: number;
  pages: number;
  data: GetcarsYears[];
};

export type GetcarsYearsById = {
  data: {
    userInfo: GetcarsYears;
    companies: GetcarsYears[];
    groups: Group[];
    users: GetcarsYears[];
  };
  type?: string;
};
export type GetcarsYearsProfile = {
  data: GetcarsYears;
  type?: string;
};

export type AddcarsYears = GetcarsYears;

export type UpdateProfile = {
  name: string;
  city: string;
  address: string;
};

export type UpdatecarsYearsLicense = LicenseStatus & { license: string };

export type carsYearsDialogProps = {
  carsYears: GetcarsYears;
  type?: string;
};

export type UpdatecarsYearsPasswordType = {
  password: string;
  passwordConfirm: string;
};
