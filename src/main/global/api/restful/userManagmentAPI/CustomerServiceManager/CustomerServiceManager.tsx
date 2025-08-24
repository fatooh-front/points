import axios from "axios";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import { Lead } from "./CustomerServiceTypes";

class CRMManager {
  static async getLead(id?: string) {
    return (await axios.get(`/api/crm-lead/find/${id}`)).data;
  }

  static async deleteLead(id: string) {
    return (await axios.delete(`/api/crm-lead/delete/${id}`)).data;
  }

  static async addLead(body: Lead) {
    return (await axios.post(`/api/crm-lead/save`, body)).data;
  }

  static async getAllLeads(params: ParamsQuery) {
    return (await axios.get(`/api/crm-lead/findall`, { params })).data;
  }
}

export default CRMManager;
