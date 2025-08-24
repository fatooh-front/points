import { toQueryString } from "@/main/global/utils/queryUtils";
import {
  AddCategories,
  UpdateCategoriesLicense,
  UpdateCategoriesPasswordType,
} from "./CategorieTypes.ts";
import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class CategorieModelsManager {
  static async getAllCategories() {
    return (await axios.get(`/api/car_category/findall`)).data;
  }

  static async getAllCategoriesLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/cars?${toQueryString(params)}`)).data;
  }

  static async getCategories(id?: string) {
    return (await axios.get(`/cars/${id}`)).data;
  }

  static async getProfile() {
    return (await axios.get(`/cars/profile`)).data;
  }

  static async getDefaultCategories() {
    return (await axios.get(`/cars/defaultCategories`)).data;
  }

  static async addCategories(body: AddCategories) {
    return (await axios.post(`/api/car_category/save`, body)).data;
  }

  static async updateCategories(id?: string, body?: FormData) {
    return (await axios.patch(`/cars/${id}/cars`, body)).data;
  }

  static async updateCategoriesPassword(
    id?: string,
    body?: UpdateCategoriesPasswordType
  ) {
    return (
      await axios.patch(
        `/cars/${id === "myId" ? "password" : `${id}/password`}`,
        body
      )
    ).data;
  }

  static async updateCategoriesLicense(
    id?: string,
    body?: Partial<UpdateCategoriesLicense>
  ) {
    return (await axios.patch(`/cars/${id}/license`, body)).data;
  }

  static async updateProfile(body: FormData) {
    return (await axios.patch(`/cars`, body)).data;
  }

  static async deleteCategories(id: string) {
    return (await axios.delete(`/api/car_category/delete/${id}`)).data;
  }
}

export default CategorieModelsManager;
