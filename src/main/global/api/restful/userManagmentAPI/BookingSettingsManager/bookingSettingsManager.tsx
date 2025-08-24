import { toQueryString } from "@/main/global/utils/queryUtils";
import {
  ExtraServices,
  BookingCancel,
  WorkingDay,
  Setting,
} from "./bookingSettingsTypes";
import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class BookingSettingsManager {
  // --- Settings Services ---
  static async getAllSettings(params: ParamsQuery) {
    return (await axios.get(`/api/setting/findall?${toQueryString(params)}`))
      .data;
  }
  static async getAllSettingsByKey(params: ParamsQuery) {
    return (
      await axios.get(`/api/setting/find-by-key?${toQueryString(params)}`)
    ).data;
  }

  static async addSettings(body: Setting[]) {
    return (await axios.post(`/api/setting/bulk-save`, body)).data;
  }

  // --- extraServices ---
  static async getAllExtraServices(params: ParamsQuery) {
    return (await axios.get(`/api/services/findall?${toQueryString(params)}`))
      .data;
  }

  static async addExtraServices(body: ExtraServices) {
    return (await axios.post(`/api/services/save`, body)).data;
  }

  static async deleteExtraServices(id: string | number) {
    return (await axios.delete(`/api/services/delete/${id}`)).data;
  }
  // --- custom-locations ---
  static async getCustomLocations(params: ParamsQuery) {
    return (await axios.get(`/api/custom-locations?${toQueryString(params)}`))
      .data;
  }

  static async addCustomLocations(body: {
    name?: string;
    longitude?: number;
    latitude?: number;
    radius?: number;
    price?: number;
  }) {
    return (await axios.post(`/api/custom-locations`, body)).data;
  }
  static async deleteCustomLocations(id: string | number) {
    return (await axios.delete(`/api/custom-locations/${id}`)).data;
  }
  // --- PreventedCarOnForeigners ---
  static async getPreventedCarOnForeigners(params: ParamsQuery) {
    return (
      await axios.get(
        `/api/car_type/ban-on-foreigners?${toQueryString(params)}`
      )
    ).data;
  }

  static async PreventedCarOnForeigners(body: {
    banOnForeigners: boolean;
    Id: string | number;
  }) {
    return (
      await axios.patch(`/api/car_type/ban-on-foreigners/${body.Id}`, {
        banOnForeigners: body.banOnForeigners,
      })
    ).data;
  }

  // --- إلغاء الحجز ---
  static async getAllBookingCancels(params: ParamsQuery) {
    return (await axios.get(`/api/booking-cancel?${toQueryString(params)}`))
      .data;
  }

  static async getBookingCancel() {
    return (await axios.get(`/api/cancellation-reasons`)).data;
  }

  static async useSetCurrentWorkingDay(id: string | number) {
    return (await axios.patch(`/api/workinghours/set-current/${id}`, {})).data;
  }
  static async addBookingCancel(body: BookingCancel) {
    return (await axios.post(`/api/cancellation-reasons`, body)).data;
  }

  static async deleteBookingCancel(id: string | number) {
    return (await axios.delete(`/api/cancellation-reasons/${id}`)).data;
  }

  // --- أيام العمل الخاصة ---
  static async getPrivateWorkingDays(branchId: string | number) {
    return (await axios.get(`/api/workinghours/private/branch/${branchId}`))
      .data;
  }

  static async addPrivateWorkingDay(body: WorkingDay) {
    return (await axios.post(`/api/workinghours/private`, body)).data;
  }

  static async deletePrivateWorkingDay(id: string) {
    return (await axios.delete(`/api/workinghours/delete/${id}`)).data;
  }

  // --- أيام العمل العادية ---
  static async getNormalWorkingDays(branchId: string | number) {
    return (await axios.get(`/api/workinghours/normal/branch/${branchId}`))
      .data;
  }

  static async addNormalWorkingDay(body: WorkingDay) {
    return (await axios.post(`/api/workinghours/normal`, body)).data;
  }

  static async deleteNormalWorkingDay(id: string) {
    return (await axios.delete(`/api/workinghours/normal/${id}`)).data;
  }
}

export default BookingSettingsManager;
