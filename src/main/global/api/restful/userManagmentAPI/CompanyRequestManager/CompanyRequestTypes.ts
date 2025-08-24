// ===== TypeScript Types =====
export type Brand = {
  brandId: number;
  brandName: string;
  arabicName: string;
};

export type CompanyRequest = {
  requestId: number;
  companyName: string;
  activity: string;
  city: string;
  responsibleName: string;
  mobile: string;
  email: string;
  notes: string | null;
  carsNumber: number;
  months: number;
  addedDate: string; // ISO string date
  requestStatus: number;
  brandsCount: number;
  brands: Brand[];
};
