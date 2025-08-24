export type Attachment = {
  name: string;
  url: string;
};
export type AddAttachment = FormData;
export type Attachments = Attachment[];

export type FilesInfo = { [key: string]: { file: File; href: string } };

export type Company = {
  id?: string;
  orgName?: string;
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

export type GetCompany = {
  _id?: string;
  name_ar?: string;
  name_en?: string;
  active?: boolean;
  wanted_users_num?: number;
  wanted_companies_num?: number;
  organization?: any;
  approval?: "approved" | "pending" | "rejected";
  commerical_registration_num?: string;
  tax_registration_num?: string;
  headquarter_address_ar?: string;
  headquarter_address_en?: string;
  region?: {
    _id?: string;
    name_ar?: string;
    name_en?: string;
  };
  category?: {
    _id?: string;
    name_ar?: string;
    name_en?: string;
  };
  website?: string;
  attachments?: string[];
  contactPersons?: {
    name?: string;
    email?: string;
    phone?: string;
    title?: string;
    _id?: string;
  }[];
  serial?: string;
  admin?: {
    _id?: string;
    firstName?: string;
    lastName?: string;
    parent?: {
      _id?: string;
      firstName?: string;
      lastName?: string;
      parent?: null | {
        _id?: string;
        firstName?: string;
        lastName?: string;
        parent?: null;
        organization?: null;
        email?: string;
      };
      organization?: null;
      email?: string;
    };
    organization?: {
      _id?: string;
      name_ar?: string;
      name_en?: string;
      approval?: "approved" | "pending" | "rejected";
      region?: {
        _id?: string;
        name_ar?: string;
        name_en?: string;
      };
      category?: {
        _id?: string;
        name_ar?: string;
        name_en?: string;
      };
    };
    email?: string;
    picture?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type GetCompanyLooKUp = {
  organization: { _id: string };
  _id: string;
  firstName: string;
  lastName: string;
  name_ar: string;
  email?: string;
};

export type GetCompaniesLookUp = {
  num: number;
  data: GetCompanyLooKUp[];
};

export type GetCompanies = {
  result: number;
  total: number;
  pages: number;
  data: GetCompany[];
};

export type GetCompanyById = {
  data: GetCompany;
  type?: string;
};

export type AddCompany = FormData;

export type UpdateProfile = {
  name: string;
  city: string;
  address: string;
};

export type UpdateCompanyLicense = LicenseStatus & { license: string };

export type CompanyDialogProps = {
  organization: GetCompany;
  type?: string;
};

export type UpdateCompanyPasswordType = {
  password: string;
  passwordConfirm: string;
};
