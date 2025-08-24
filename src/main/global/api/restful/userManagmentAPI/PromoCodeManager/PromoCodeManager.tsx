import { toQueryString } from "@/main/global/utils/queryUtils";
import { Promo } from "./PromoCodeTypes"; // renamed AddTypes to AddPromo if needed
import axios from "axios";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class PromosManager {
  /**
   * Create a new promo
   * POST /api/promos/save
   */
  static async addPromo(body: Promo) {
    return (await axios.post(`/api/promo/save`, body)).data;
  }

  /**
   * Get a single promo by ID
   * GET /api/promos/find/:id
   */
  static async getPromo(id: string) {
    return (await axios.get(`/api/promo/find/${id}`)).data;
  }
  static async deletePromo(id: string) {
    return (await axios.delete(`/api/promo/delete/${id}`)).data;
  }
  /**
   * Get all promos
   * GET /api/promos/findall
   */
  static async getAllPromos(params: ParamsQuery) {
    return (await axios.get(`/api/promo/findall?${toQueryString(params)}`))
      .data;
  }

  /**
   * Optional: Lookups if needed (you can rename or remove)
   */
  static async getPromosLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/promos?${toQueryString(params)}`)).data;
  }

  // Optionally, you can add:
  // static async updatePromo(...) {}
  // static async deletePromo(id: string) {}
}

export default PromosManager;
