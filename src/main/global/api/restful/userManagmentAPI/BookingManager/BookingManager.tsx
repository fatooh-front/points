import { toQueryString } from "@/main/global/utils/queryUtils";
import axios from "axios";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import { MaintenanceRequest } from "./BookingTypes";

class BookingManager {
  static async getAllReservation(params: ParamsQuery) {
    return (await axios.get(`/api/reservation/search?${toQueryString(params)}`))
      .data;
  }
  static async getAllLimousineReservation(params: ParamsQuery) {
    return (
      await axios.get(
        `/api/limousine-reservations/admin/reservations?${toQueryString(
          params
        )}`
      )
    ).data;
  }
  static async getReservation(id?: string) {
    return (await axios.get(`/api/reservation/show/${id}`)).data;
  }
  static async getLimousineReservationDetails(id?: string) {
    return (
      await axios.get(`/api/limousine-reservations/admin/reservations/${id}`)
    ).data;
  }
  static async getAllMaintenanceRequests(params: ParamsQuery) {
    return (await axios.get(`/api/min-requests?${toQueryString(params)}`)).data;
  }

  static async getMaintenanceRequests(id?: string) {
    return (await axios.get(`/api/min-requests/${id}`)).data;
  }
  static async deleteMaintenanceRequests(id: string) {
    return (await axios.delete(`/api/min-requests/${id}`)).data;
  }
  static async addMaintenanceRequests(body: MaintenanceRequest) {
    return (await axios.post(`/api/limousine-cars`, body)).data;
  }
  static async addMaintenanceRequestsReject(id: string) {
    return (await axios.patch(`/api/min-requests/reject/${id}`, {})).data;
  }
  static async addMaintenanceRequestsFinish(
    id: string,
    finishComments: string | null
  ) {
    return (
      await axios.patch(`/api/min-requests/finish/${id}`, { finishComments })
    ).data;
  }
  static async addMaintenanceRequestsApprove(id: string | number) {
    return (await axios.patch(`/api/min-requests/approve/${id}`, {})).data;
  }
  static async changeStatusReservation(id: string | number, status: string) {
    return (
      await axios.patch(`/api/reservation/change-status/${id}`, { status })
    ).data;
  }
  static async changeStatusLimousineReservation(
    id: string | number,
    status: string
  ) {
    return (
      await axios.patch(
        `api/limousine-reservations/admin/reservations/${id}/status
`,
        { status }
      )
    ).data;
  }
}

export default BookingManager;
