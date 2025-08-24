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

export type GetCarsModels = {
  carBrandId: string | number;
  arabicName: string;
  englishName: string;
  carModelId?: string | number | undefined | null;
  notes?: string | undefined | null;
};

export type GetCarsModelsLooKUp = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type GetCarsModelssLookUp = {
  num: number;
  data: GetCarsModelsLooKUp[];
};

export type GetCarsModelss = {
  result: number;
  total: number;
  pages: number;
  data: GetCarsModels[];
};

export type GetCarsModelsById = {
  data: {
    userInfo: GetCarsModels;
    companies: GetCarsModels[];
    groups: Group[];
    users: GetCarsModels[];
  };
  type?: string;
};
export type GetCarsModelsProfile = {
  data: GetCarsModels;
  type?: string;
};

export type AddCarsModels = GetCarsModels;

export type UpdateProfile = {
  name: string;
  city: string;
  address: string;
};

export type UpdateCarsModelsLicense = LicenseStatus & { license: string };

export type CarsModelsDialogProps = {
  carsModels: GetCarsModels;
  type?: string;
};

export type UpdateCarsModelsPasswordType = {
  password: string;
  passwordConfirm: string;
};
