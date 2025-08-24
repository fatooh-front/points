import { toQueryString } from "@/main/global/utils/queryUtils";
import {
  AddBranches,
  UpdateBranchesLicense,
  UpdateBranchesPasswordType,
} from "./BranchesTypes.ts";
import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class BrancheModelsManager {
  static async getAllBranches() {
    return (await axios.get(`/api/branch/findall`)).data;
  }

  static async getAllBranchesLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/cars?${toQueryString(params)}`)).data;
  }

  static async getBranche(id?: string) {
    return (await axios.get(`/api/branch/find/${id}`))?.data?.data;
  }
  static async getCarsBranche(id?: string) {
    return (await axios.get(`/branch/${id}`))?.data?.data;
  }

  static async getProfile() {
    return (await axios.get(`/cars/profile`)).data;
  }

  static async getDefaultBranches() {
    return (await axios.get(`/cars/defaultBranches`)).data;
  }

  static async addBranches(body: AddBranches) {
    return (await axios.post(`/api/branch/save`, body)).data;
  }

  static async updateBranches(id?: string, body?: FormData) {
    return (await axios.patch(`/cars/${id}/cars`, body)).data;
  }

  static async updateBranchesPassword(
    id?: string,
    body?: UpdateBranchesPasswordType
  ) {
    return (
      await axios.patch(
        `/cars/${id === "myId" ? "password" : `${id}/password`}`,
        body
      )
    ).data;
  }

  static async updateBranchesLicense(
    id?: string,
    body?: Partial<UpdateBranchesLicense>
  ) {
    return (await axios.patch(`/cars/${id}/license`, body)).data;
  }

  static async updateProfile(body: FormData) {
    return (await axios.patch(`/cars`, body)).data;
  }

  static async deleteBranches(id: string) {
    return (await axios.delete(`/api/branch/delete/${id}`)).data;
  }
}

export default BrancheModelsManager;
