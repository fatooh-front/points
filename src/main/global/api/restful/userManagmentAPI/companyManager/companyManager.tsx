import { toQueryString } from "@/main/global/utils/queryUtils";
import {
  AddCompany,
  UpdateCompanyLicense,
  UpdateCompanyPasswordType,
} from "./companyTypes";
import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class CompanyManager {
  static async getAllCompanies(params: ParamsQuery) {
    return (await axios.get(`/${params?.type}?${toQueryString(params)}`)).data;
  }

  static async getAllCompaniesLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/company?${toQueryString(params)}`)).data;
  }

  static async getCompany(id?: string) {
    return (await axios.get(`/company/${id}`)).data;
  }

  static async getProfile() {
    return (await axios.get(`/company/profile`)).data;
  }

  static async getDefaultCompany() {
    return (await axios.get(`/company/defaultCompany`)).data;
  }

  static async addCompany(body: AddCompany, type: string) {
    return (await axios.post(`/company${_.capitalize(type)}`, body)).data;
  }

  static async updateCompany(id?: string, body?: FormData) {
    return (await axios.patch(`/company/${id}`, body)).data;
  }

  static async updateCompanyPassword(
    id?: string,
    body?: UpdateCompanyPasswordType
  ) {
    return (
      await axios.patch(
        `/company/${id === "myId" ? "password" : `${id}/password`}`,
        body
      )
    ).data;
  }

  static async updateCompanyLicense(
    id?: string,
    body?: Partial<UpdateCompanyLicense>
  ) {
    return (await axios.patch(`/company/${id}/license`, body)).data;
  }

  static async updateProfile(body: FormData) {
    return (await axios.patch(`/company`, body)).data;
  }

  static async deleteCompany(id: string) {
    return (await axios.delete(`/company/${id}`)).data;
  }
}

export default CompanyManager;
