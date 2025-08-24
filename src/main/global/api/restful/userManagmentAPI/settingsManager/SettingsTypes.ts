export type GetSetting = {
  _id: string;
  name: string;
  logo: string;
  portalLink: string;
  created_at: string;
  updated_at: string;
  __v?: number;
  id?: string;
};

export type GetSettingsData = GetSetting[];

export type GetSettings = {
  result?: number;
  data: GetSettingsData;
};

export type AddSetting = {
  name: string;
  logo?: File | undefined;
  panelLink?: string;
  portalLink?: string;
};

export type Setting = {
  data: GetSetting;
};
