import { toQueryString } from "@/main/global/utils/queryUtils";

import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class ClientsManager {
  // --- Settings Services ---
  // --- Clients CRUD ---
  static async getAllClients(params: ParamsQuery) {
    return (await axios.get(`/api/client/search?${toQueryString(params)}`))
      .data;
  }
  static async getAllLookUpClients(params: ParamsQuery) {
    return (await axios.get(`/api/client/searchs?${toQueryString(params)}`))
      .data;
  }

  static async getClient(id?: string | number) {
    return (await axios.get(`/api/client/find/${id}`)).data;
  }
  static async getClientPoint(id?: string | number) {
    return (await axios.get(`/api/points/client/${id}`)).data;
  }

  static async ClientPointsUse(body: {
    clientId: number | string;
    pointsUsed: number;
  }) {
    return (await axios.post(`/api/points/use`, body)).data;
  }
  static async addOrUpdateClient(body: any) {
    return (await axios.post(`/api/points/use`, body)).data;
  }

  static async deleteClient(id: string | number) {
    return (await axios.delete(`/api/client/delete/${id}`)).data;
  }
}

export default ClientsManager;
