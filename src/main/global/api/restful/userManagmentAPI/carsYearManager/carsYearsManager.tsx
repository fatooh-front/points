import { toQueryString } from "@/main/global/utils/queryUtils";
import {
  AddcarsYears,
  UpdatecarsYearsLicense,
  UpdatecarsYearsPasswordType,
} from "./carsYearsTypes";
import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class carsYearsManager {
  static async getAllcarsYears() {
    return (await axios.get(`api/car_year/findall`)).data;
  }

  static async getAllcarsYearsLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/cars?${toQueryString(params)}`)).data;
  }

  static async getcarsYears(id?: string) {
    return (await axios.get(`/cars/${id}`)).data;
  }

  static async getProfile() {
    return (await axios.get(`/cars/profile`)).data;
  }

  static async getDefaultcarsYears() {
    return (await axios.get(`/cars/defaultcarsYears`)).data;
  }

  static async addcarsYears(body: AddcarsYears) {
    return (await axios.post(`/api/car_year/save`, body)).data;
  }

  static async updatecarsYears(id?: string, body?: FormData) {
    return (await axios.patch(`/cars/${id}/cars`, body)).data;
  }

  static async updatecarsYearsPassword(
    id?: string,
    body?: UpdatecarsYearsPasswordType
  ) {
    return (
      await axios.patch(
        `/cars/${id === "myId" ? "password" : `${id}/password`}`,
        body
      )
    ).data;
  }

  static async updatecarsYearsLicense(
    id?: string,
    body?: Partial<UpdatecarsYearsLicense>
  ) {
    return (await axios.patch(`/cars/${id}/license`, body)).data;
  }

  static async updateProfile(body: FormData) {
    return (await axios.patch(`/cars`, body)).data;
  }

  static async deletecarsYears(id: string) {
    return (await axios.delete(`/api/car_year/delete/${id}`)).data;
  }
}

export default carsYearsManager;
