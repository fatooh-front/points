export type ExtraServices = {
  nameEnglish?: string;
  nameArabic?: string;
  serviceType?: any;
  iconUrl?: string;
  detailsEnglish?: string;
  detailsArabic?: string;
  notes?: string;
  serviceId?: string | number;
  price?: number;
  serviceAvailability?: number;
  // أضف باقي الحقول حسب الحاجة
};
export type Setting = {
  settingId?: number | string | null;
  setKey: string;
  setType: number | null;
  setValue: string | number;
};
export type BookingCancel = {
  reason_id?: string | number | null;
  englishName: string;
  arabicName: string;
  notes?: string | null;
};

export type WorkingDay = {
  id?: string;
  branchId: string;
  day: string;
  openTime: string;
  closeTime: string;
  status: string;
};
