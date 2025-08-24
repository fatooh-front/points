export type Attachment = {
  name: string;
  url: string;
};
export type Limousine = {
  id?: number;
  name?: string;
  cityName?: string;
  brandName?: string;
  brandId?: number;
  modelName?: string;
  modelId?: number;
  year?: string;
  yearId?: number;
  typeName?: string;
  typeId?: number;
  image?: string;
  notes?: string;

  daysHours?: number | null;
  airportMakkah?: number | null;
  airportJeddah?: number | null;
  cityToCity?: number | null;
  sameCity?: number | null;
  firstFourHours?: number | null;
  extraHour?: number | null;
  dayPrice?: number | null;
  extraHourDayPrice?: number | null;
};
