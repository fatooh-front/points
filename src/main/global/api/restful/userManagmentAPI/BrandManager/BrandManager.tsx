import { toQueryString } from "@/main/global/utils/queryUtils";
import {
  AddBrands,
  UpdateBrandsLicense,
  UpdateBrandsPasswordType,
} from "./BrandTypes.ts";
import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class BrandModelsManager {
  static async getAllBrands() {
    return (await axios.get(`/api/car_brand/findall`)).data;
  }

  static async getAllBrandsLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/cars?${toQueryString(params)}`)).data;
  }

  static async getBrands(id?: string) {
    return (await axios.get(`/cars/${id}`)).data;
  }

  static async getProfile() {
    return (await axios.get(`/cars/profile`)).data;
  }

  static async getDefaultBrands() {
    return (await axios.get(`/cars/defaultBrands`)).data;
  }

  static async addBrands(body: AddBrands) {
    return (await axios.post(`/api/car_brand/save`, body)).data;
  }

  static async updateBrands(id?: string, body?: FormData) {
    return (await axios.patch(`/cars/${id}/cars`, body)).data;
  }

  static async updateBrandsPassword(
    id?: string,
    body?: UpdateBrandsPasswordType
  ) {
    return (
      await axios.patch(
        `/cars/${id === "myId" ? "password" : `${id}/password`}`,
        body
      )
    ).data;
  }

  static async updateBrandsLicense(
    id?: string,
    body?: Partial<UpdateBrandsLicense>
  ) {
    return (await axios.patch(`/cars/${id}/license`, body)).data;
  }

  static async updateProfile(body: FormData) {
    return (await axios.patch(`/cars`, body)).data;
  }

  static async deleteBrands(id: string) {
    return (await axios.delete(`/api/car_brand/delete/${id}`)).data;
  }
}

export default BrandModelsManager;
