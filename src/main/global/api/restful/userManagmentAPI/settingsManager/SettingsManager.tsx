import axios from "axios";

import { ParamsQuery } from "@/main/global/types/CommonTypes";

class SettingsManager {
  static async getAllSettings(params?: ParamsQuery) {
    console.log("getAllSettings params", params);
  }

  static async getSetting(id: string) {
    return (await axios.get(`/setting/${id}`)).data;
  }

  static async getSettingByName(name: string) {
    return (
      await axios.get(`/setting/name?name=${name}`, {
        headers: {
          skipAuth: true,
        },
      })
    ).data;
  }

  static async addSetting(body: FormData) {
    return (await axios.post(`/setting`, body)).data;
  }

  static async updateSetting(id: string, body: FormData) {
    return (await axios.patch(`/setting/${id}`, body)).data;
  }

  static async deleteSetting(id: string) {
    return (await axios.delete(`/setting/${id}`)).data;
  }
}

export default SettingsManager;
