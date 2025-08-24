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

export type GetEngine = {
  engId?: number | string | null;
  arabicName: string;
  englishName: string;
  notes?: string | null;
};

export type GetEnginesLooKUp = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type GetEnginesLookUp = {
  num: number;
  data: GetEnginesLooKUp[];
};

export type GetEngines = {
  result: number;
  total: number;
  pages: number;
  data: GetEngine[];
};

export type GetEnginesById = {
  data: {
    userInfo: GetEngine;
    companies: GetEngine[];
    groups: Group[];
    users: GetEngine[];
  };
  type?: string;
};
export type GetEnginesProfile = {
  data: GetEngine;
  type?: string;
};

export type AddEngines = GetEngine;

export type UpdateProfile = {
  name: string;
  city: string;
  address: string;
};

export type UpdateEnginesLicense = LicenseStatus & { license: string };

export type EnginesDialogProps = {
  Engines: GetEngine;
  type?: string;
};

export type UpdateEnginesPasswordType = {
  password: string;
  passwordConfirm: string;
};
