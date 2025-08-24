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

export type GetCars = {
  carId: string | number;
  carStatus: string | number;
  carName: string;
  carCode: string;
  detailsEnglish: string;
  detailsArabic: string;
  plateNumber: string;
  images?: string[];
  brandId: string | number;
  modelId: string | number;
  engineId: string | number;
  yearId: string | number;
  typeId: string | number;
  categoryId: string | number;
  image: string;
  cover: string;
  numberOfDoors: string | number;
  numberOfPassengers: string | number;
  airCondition: boolean;
  showHome: boolean;
  price: string | number;
  offer: boolean;
  insurancePrice: string | number;
  dailyPrice: string | number;
  weeklyPrice: string | number;
  monthlyPrice: string | number;
  yearlyPrice: string | number;
  offerDailyPrice: string | number;
  offerWeeklyPrice: string | number;
  extraHoursPrice: string | number;
  offerMonthlyPrice: string | number;
  offerYearlyPrice: string | number;
  kmPrice: string | number;
  maxKm: string | number;
  systemId: string;
  notes: string;
  brandName: string;
  brandArabicName: string;
  brandLogo: string;
  brandNotes: string | null;
  modelEnglishName: string;
  modelArabicName: string;
  modelNotes: string;
  engineEnglishName: string;
  engineArabicName: string;
  engineNotes: string;
  carYear: string | number;
  carYearNotes: string;
  typeEnglishName: string;
  typeArabicName: string;
  typeNotes: string;
  categoryEnglishName: string;
  categoryArabicName: string;
  categoryDeliveryPrice: string | number;
  categoryNotes: string | null;
  finalPrice: string | number;
  numOfDays: string | number;
  datingType: string | number;
  extraKmId: string | number;
  extraKm: string;
  extraPrice: string | number;
  extraNotes: string | number;
};

export type GetCarsLooKUp = {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export type GetCarssLookUp = {
  num: string | number;
  data: GetCarsLooKUp[];
};

export type GetCarss = {
  result: string | number;
  total: string | number;
  pages: string | number;
  data: { size: string | number; cars: GetCars };
};

export type GetCarsById = {
  data: GetCars;
  type?: string;
};
export type ExtrakmData = {
  kmId?: string | number;
  carId?: string | number;
  price: string | number;
  km: string | number;
};
export type WorkingHours = {
  hourName?: string | null;
  hourId?: number | string | null;
  objId: number | string | null;
  current?: number | string | null;
  sun?: number | string | null;
  mon?: number | string | null;
  tues?: number | string | null;
  wed?: number | string | null;
  thurs?: number | string | null;
  fri?: number | string | null;
  sat?: number | string | null;
  sunOpenHour?: number | string | null;
  sunOpenMin?: number | string | null;
  monOpenHour?: number | string | null;
  monOpenMin?: number | string | null;
  tuesOpenHour?: number | string | null;
  tuesOpenMin?: number | string | null;
  wedOpenHour?: number | string | null;
  wedOpenMin?: number | string | null;
  thursOpenHour?: number | string | null;
  thursOpenMin?: number | string | null;
  friOpenHour?: number | string | null;
  friOpenMin?: number | string | null;
  satOpenHour?: number | string | null;
  satOpenMin?: number | string | null;
  sunCloseHour?: number | string | null;
  sunCloseMin?: number | string | null;
  monCloseHour?: number | string | null;
  monCloseMin?: number | string | null;
  tuesCloseHour?: number | string | null;
  tuesCloseMin?: number | string | null;
  wedCloseHour?: number | string | null;
  wedCloseMin?: number | string | null;
  thursCloseHour?: number | string | null;
  thursCloseMin?: number | string | null;
  friCloseHour?: number | string | null;
  friCloseMin?: number | string | null;
  satCloseHour?: number | string | null;
  satCloseMin?: number | string | null;
  notes?: string | null;
};
export type GetExtrakmDataByCarId = {
  data: ExtrakmData[];
};
export type GetWorkingHours = {
  data: WorkingHours[];
};
export type GetCarsProfile = {
  data: GetCars;
  type?: string;
};

export type AddCars = {
  carId?: string | number | null;
  carStatus?: string | number | null;
  carName: string;
  carCode: string;
  plateNumber: string;
  brandId: string | number;
  modelId: string | number;
  engineId: string | number;
  yearId: string | number;
  typeId: string | number;
  image?: string | null;
  cover?: string | null;
  numberOfDoors: string | number;
  numberOfPassengers: string | number;
  airCondition: boolean;
  showHome: boolean;
  price?: string | number | null;
  offer?: boolean | null;
  insurancePrice?: string | number | null;
  dailyPrice?: string | number | null;
  weeklyPrice?: string | number | null;
  monthlyPrice?: string | number | null;
  yearlyPrice?: string | number | null;
  offerDailyPrice?: string | number | null;
  offerWeeklyPrice?: string | number | null;
  offerMonthlyPrice?: string | number | null;
  offerYearlyPrice?: string | number | null;
  discountPercentage?: string | number | null;
  kmPrice?: string | number | null;
  maxKm?: string | number | null;
  systemId?: string | null;
  notes?: string | null;
  brandName?: string | null;
  brandArabicName?: string | null;
  brandLogo?: string | null;
  brandNotes?: string | null;
  modelEnglishName?: string | null;
  modelArabicName?: string | null;
  modelNotes?: string | null;
  engineEnglishName?: string | null;
  engineArabicName?: string | null;
  engineNotes?: string | null;
  carYear?: string | number | null;
  carYearNotes?: string | null;
  typeEnglishName?: string | null;
  typeArabicName?: string | null;
  typeNotes?: string | null;
  categoryEnglishName?: string | null;
  categoryArabicName?: string | null;
  categoryDeliveryPrice?: string | number | null;
  categoryNotes?: string | null | null;
  finalPrice?: string | number | null;
  numOfDays?: string | number | null;
  datingType?: string | number | null;
  extraKmId?: string | number | null;
  extraKm?: string | null;
  extraPrice?: string | number | null;
  extraNotes?: string | number | null;
};

export type UpdateProfile = {
  name: string;
  city: string;
  address: string;
};

export type UpdateCarsLicense = LicenseStatus & { license: string };

export type CarsDialogProps = {
  cars: GetCars;
  type?: string;
};

export type UpdateCarsPasswordType = {
  password: string;
  passwordConfirm: string;
};
