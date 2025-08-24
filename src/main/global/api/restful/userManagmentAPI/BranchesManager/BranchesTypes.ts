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

export type GetBranche = {
  branchId?: number | string | null;
  cityId: number | string;
  whId?: number | string | null;
  branchName: string;
  branchArName: string;
  addressEnglish?: string | null;
  addressArabic?: string | null;

  latitude: number;
  longitude: number;
  mobile: string;
  email: string;
  phone1: number | string;
  phone2?: number | string | null;
  workingHoures: string;
  notes?: string | null;
};

export type GetBranchesLooKUp = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type GetBranchesLookUp = {
  num: number;
  data: GetBranchesLooKUp[];
};

export type GetBranches = {
  result: number;
  total: number;
  pages: number;
  data: GetBranche[];
};

export type GetBranchesById = {
  data: GetBranche;
  type?: string;
};
export type GetBranchesProfile = {
  data: GetBranche;
  type?: string;
};

export type AddBranches = GetBranche;

export type UpdateProfile = {
  name: string;
  city: string;
  address: string;
};

export type UpdateBranchesLicense = LicenseStatus & { license: string };

export type BranchesDialogProps = {
  Branches: GetBranche;
  type?: string;
};

export type UpdateBranchesPasswordType = {
  password: string;
  passwordConfirm: string;
};
