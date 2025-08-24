import axios from "axios";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import { CompanyRequest } from "./CompanyRequestTypes";

class CompanyRequestsManager {
  static async getCompanyRequest(id?: string) {
    return (await axios.get(`/api/company-requests/${id}`)).data;
  }

  static async deleteCompanyRequest(id: string) {
    return (await axios.delete(`/api/min-requests/${id}`)).data;
  }

  static async addCompanyRequest(body: CompanyRequest) {
    return (await axios.post(`/api/company-requests`, body)).data;
  }

  static async getAllCompanyRequests(params: ParamsQuery) {
    return (await axios.get(`/api/company-requests`, { params })).data;
  }
  static async addCompanyRequestsApprove(id: string | number) {
    return (await axios.patch(`/api/company-requests/${id}/approve`, {})).data;
  }
  static async addCompanyRequestsReject(id: string) {
    return (await axios.patch(`/api/company-requests/${id}/reject`, {})).data;
  }
}
export default CompanyRequestsManager;
