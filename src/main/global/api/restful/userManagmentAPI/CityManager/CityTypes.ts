export type GetCity = {
  id?: number | string | null;
  notes?: string | null | null;
  nameAr: string;
  name: string;
  longitude?: number | null;
  latitude?: number | null;
};

export type GetCitys = {
  result: number;
  total: number;
  pages: number;
  data: GetCity[];
};
