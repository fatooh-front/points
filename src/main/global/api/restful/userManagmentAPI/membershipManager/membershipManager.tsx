import { toQueryString } from "@/main/global/utils/queryUtils";
import { Membership } from "./membershipTypes"; // renamed AddTypes to AddMembership if needed
import axios from "axios";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class MembershipsManager {
  /**
   * Create a new membership
   * POST /api/memberships/save
   */

  static async addMembership(body: Membership) {
    return (await axios.post(`/api/memberships/save`, body)).data;
  }

  /**
   * Get a single membership by ID
   * GET /api/memberships/find/:id
   */
  static async getMembership(id: string) {
    return (await axios.get(`/api/memberships/find/${id}`)).data;
  }
  static async deleteMembership(id: string) {
    return (await axios.delete(`/api/memberships/delete/${id}`)).data;
  }
  /**
   * Get all memberships
   * GET /api/memberships/findall
   */
  static async getAllMemberships() {
    return (await axios.get(`/api/memberships/findall`)).data;
  }

  /**
   * Optional: Lookups if needed (you can rename or remove)
   */
  static async getMembershipsLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/memberships?${toQueryString(params)}`))
      .data;
  }

  // Optionally, you can add:
  // static async updateMembership(...) {}
  // static async deleteMembership(id: string) {}
}

export default MembershipsManager;
