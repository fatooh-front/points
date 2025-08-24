//SettingsTypes.ts
export type Setting = {
  id: string;
  name: string;
  value: string;
};

export type AllSettingsData = {
  settings: Setting[];
};

export type SettingData = {
  setting: Setting;
};

export type SettingVariables = {
  id: string;
};

export type SettingByNameVariables = {
  name: string;
};

export type AddSettingVariables = {
  name: string;
  value: string;
};

export type UpdateSettingVariables = {
  id: string;
  name?: string;
  value?: string;
};

export type DeleteSettingVariables = {
  id: string;
};
