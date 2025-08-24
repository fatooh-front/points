import { toQueryString } from "@/main/global/utils/queryUtils";
import { Limousine } from "./LimousineTypes"; // renamed AddTypes to AddLimousine if needed
import axios from "axios";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class LimousinesManager {
  /**
   * Create a new membership
   * POST /api/memberships/save
   */

  static async editLimousine(body: Limousine, id: string) {
    return (await axios.put(`/api/limousine-cars/${id}/info`, body)).data;
  }
  static async addLimousine(body: Limousine) {
    return (await axios.post(`/api/limousine-cars`, body)).data;
  }
  static async addLimousinePricing(body: Limousine, id: string) {
    return (await axios.put(`/api/limousine-cars/${id}/pricing`, body)).data;
  }
  /**
   * Get a single membership by ID
   * GET /api/memberships/find/:id
   */
  static async getLimousine(id: string) {
    return (await axios.get(`/api/limousine-cars/${id}`)).data;
  }
  static async deleteLimousine(id: string) {
    return (await axios.delete(`/api/limousine-cars/${id}`)).data;
  }
  /**
   * Get all memberships
   * GET /api/memberships/findall
   */
  static async getAllLimousines() {
    return (await axios.get(`/api/limousine-cars`)).data;
  }

  /**
   * Optional: Lookups if needed (you can rename or remove)
   */
  static async getLimousinesLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/memberships?${toQueryString(params)}`))
      .data;
  }

  // Optionally, you can add:
  // static async updateLimousine(...) {}
  // static async deleteLimousine(id: string) {}
}

export default LimousinesManager;
