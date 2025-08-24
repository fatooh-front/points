import { toQueryString } from "@/main/global/utils/queryUtils";
import {
  AddTypes,
  UpdateTypesLicense,
  UpdateTypesPasswordType,
} from "./TypeTypes.ts";
import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class TypeModelsManager {
  static async getAllTypes() {
    return (await axios.get(`/api/car_type/findall`)).data;
  }

  static async getAllTypesLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/cars?${toQueryString(params)}`)).data;
  }

  static async getTypes(id?: string) {
    return (await axios.get(`/cars/${id}`)).data;
  }

  static async getProfile() {
    return (await axios.get(`/cars/profile`)).data;
  }

  static async getDefaultTypes() {
    return (await axios.get(`/cars/defaultTypes`)).data;
  }

  static async addTypes(body: AddTypes) {
    return (await axios.post(`/api/car_type/save`, body)).data;
  }

  static async updateTypes(id?: string, body?: FormData) {
    return (await axios.patch(`/cars/${id}/cars`, body)).data;
  }

  static async updateTypesPassword(
    id?: string,
    body?: UpdateTypesPasswordType
  ) {
    return (
      await axios.patch(
        `/cars/${id === "myId" ? "password" : `${id}/password`}`,
        body
      )
    ).data;
  }

  static async updateTypesLicense(
    id?: string,
    body?: Partial<UpdateTypesLicense>
  ) {
    return (await axios.patch(`/cars/${id}/license`, body)).data;
  }

  static async updateProfile(body: FormData) {
    return (await axios.patch(`/cars`, body)).data;
  }

  static async deleteTypes(id: string) {
    return (await axios.delete(`/api/car_type/delete/${id}`)).data;
  }
}

export default TypeModelsManager;
