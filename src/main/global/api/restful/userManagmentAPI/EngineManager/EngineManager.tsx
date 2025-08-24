import { toQueryString } from "@/main/global/utils/queryUtils";
import {
  AddEngines,
  UpdateEnginesLicense,
  UpdateEnginesPasswordType,
} from "./EngineTypes";
import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class EngineModelsManager {
  static async getAllEngines() {
    return (await axios.get(`/api/car_engine/findall`)).data;
  }

  static async getAllEnginesLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/cars?${toQueryString(params)}`)).data;
  }

  static async getEngines(id?: string) {
    return (await axios.get(`/cars/${id}`)).data;
  }

  static async getProfile() {
    return (await axios.get(`/cars/profile`)).data;
  }

  static async getDefaultEngines() {
    return (await axios.get(`/cars/defaultEngines`)).data;
  }

  static async addEngines(body: AddEngines) {
    return (await axios.post(`/api/car_engine/save`, body)).data;
  }

  static async updateEngines(id?: string, body?: FormData) {
    return (await axios.patch(`/cars/${id}/cars`, body)).data;
  }

  static async updateEnginesPassword(
    id?: string,
    body?: UpdateEnginesPasswordType
  ) {
    return (
      await axios.patch(
        `/cars/${id === "myId" ? "password" : `${id}/password`}`,
        body
      )
    ).data;
  }

  static async updateEnginesLicense(
    id?: string,
    body?: Partial<UpdateEnginesLicense>
  ) {
    return (await axios.patch(`/cars/${id}/license`, body)).data;
  }

  static async updateProfile(body: FormData) {
    return (await axios.patch(`/cars`, body)).data;
  }

  static async deleteEngines(id: string) {
    return (await axios.delete(`/api/car_engine/delete/${id}`)).data;
  }
}

export default EngineModelsManager;
