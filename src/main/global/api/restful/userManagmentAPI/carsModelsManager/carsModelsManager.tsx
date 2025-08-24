import { toQueryString } from "@/main/global/utils/queryUtils";
import {
  AddCarsModels,
  UpdateCarsModelsLicense,
  UpdateCarsModelsPasswordType,
} from "./carsModelsTypes";
import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class CarsModelsManager {
  static async getAllCarsModels() {
    return (await axios.get(`api/car_model/findall`)).data;
  }

  static async getAllCarsModelsLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/cars?${toQueryString(params)}`)).data;
  }

  static async getCarsModels(id?: string) {
    return (await axios.get(`/cars/${id}`)).data;
  }

  static async getProfile() {
    return (await axios.get(`/cars/profile`)).data;
  }

  static async getDefaultCarsModels() {
    return (await axios.get(`/cars/defaultCarsModels`)).data;
  }

  static async addCarsModels(body: AddCarsModels) {
    return (await axios.post(`/api/car_model/save`, body)).data;
  }

  static async updateCarsModels(id?: string, body?: FormData) {
    return (await axios.patch(`/cars/${id}/cars`, body)).data;
  }

  static async updateCarsModelsPassword(
    id?: string,
    body?: UpdateCarsModelsPasswordType
  ) {
    return (
      await axios.patch(
        `/cars/${id === "myId" ? "password" : `${id}/password`}`,
        body
      )
    ).data;
  }

  static async updateCarsModelsLicense(
    id?: string,
    body?: Partial<UpdateCarsModelsLicense>
  ) {
    return (await axios.patch(`/cars/${id}/license`, body)).data;
  }

  static async updateProfile(body: FormData) {
    return (await axios.patch(`/cars`, body)).data;
  }

  static async deleteCarsModels(id: string) {
    return (await axios.delete(`/api/car_model/delete/${id}`)).data;
  }
}

export default CarsModelsManager;
