import { toQueryString } from "@/main/global/utils/queryUtils";
import { AddCars, ExtrakmData, WorkingHours } from "./carsTypes";
import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class CarsManager {
  static async getAllCars(params: ParamsQuery) {
    console.log(params, "params in getAllCars");

    return (await axios.get(`api/car/searchs?${toQueryString(params)}`)).data;
  }
  static async getAllCarsbyName(params: ParamsQuery) {
    console.log(params, "params in getAllCars");

    return (await axios.get(`api/car/search-by-name?${toQueryString(params)}`))
      .data;
  }

  static async getCars(id?: string) {
    return (await axios.get(`/api/car/finds/${id}`)).data;
  }
  static async getWorkinghours(id?: string | number) {
    return (
      await axios.get(`/api/workinghours/find/branch/${id}/all-working-hours`)
    ).data;
  }
  static async getCarExtrakm(id?: string) {
    return (await axios.get(`/api/car_extrakm/find/car/${id}`)).data;
  }
  static async getCarBranchbyCar(id?: string, isFormFormat?: boolean) {
    const res = (await axios.get(`/api/car_branch/find-by-car/${id}`)).data;
    if (isFormFormat) {
      let FormFormat: any = {};
      res.data.forEach((item: any) => {
        console.log(res, "brancddh2");

        FormFormat[item.branchId] = item;
      });
      console.log(FormFormat, "brancddh2");

      return FormFormat;
    } else {
      return res;
    }
  }

  static async addCars(body: AddCars) {
    return (await axios.post(`api/car/save`, body)).data;
  }

  static async addExtrakm(body: ExtrakmData) {
    return (await axios.post(`api/car_extrakm/save`, body)).data;
  }
  static async addWorkingHours(body: WorkingHours) {
    return (await axios.post(`api/workinghours/save`, body)).data;
  }
  static async setCurrentWorkingDay(id: string | number) {
    return (await axios.patch(`/api/workinghours/set-current/${id}`, {})).data;
  }
  static async addCarOnbranchs(body: any) {
    return (await axios.post(`/api/car_branch/save-bulk`, body)).data;
  }
  static async deleteCars(id: string) {
    console.log(id, "ffffffffffffffffffffff");

    return (await axios.delete(`/cars/${id}`)).data;
  }
  static async deleteCarBranchs(id: string) {
    console.log(id, "ffffffffffffffffffffff");

    return (await axios.delete(`/api/car_branch/delete/${id}`)).data;
  }
  static async deleteExtrakm(id: string | number) {
    console.log(id, "ffffffffffffffffffffff");

    return (await axios.delete(`api/car_extrakm/delete/${id}`)).data;
  }
}

export default CarsManager;
