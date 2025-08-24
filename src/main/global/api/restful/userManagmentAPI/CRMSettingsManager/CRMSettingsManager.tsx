import { toQueryString } from "@/main/global/utils/queryUtils";
import axios from "axios";
import { ParamsQuery } from "@/main/global/types/CommonTypes";
import {
  Department,
  Group,
  Source,
  Status,
  Ticket,
  TicketReason,
  TicketType,
} from "./CRMSettingsTypes";

class SiteManager {
  static async getAllGroups(params: ParamsQuery) {
    return (await axios.get(`/api/crm-group/findall?${toQueryString(params)}`))
      .data;
  }

  static async getGroup(id?: string) {
    return (await axios.get(`/api/crm-group/find/${id}`)).data;
  }
  static async deleteGroup(id: string) {
    return (await axios.delete(`/api/crm-group/delete/${id}`)).data;
  }
  static async addGroup(body: Group) {
    return (await axios.post(`/api/crm-group/save`, body)).data;
  }
  static async getDepartment(id?: string) {
    return (await axios.get(`/api/crm-department/find/${id}`)).data;
  }

  static async deleteDepartment(id: string) {
    return (await axios.delete(`/api/crm-department/delete/${id}`)).data;
  }

  static async addDepartment(body: Department) {
    return (await axios.post(`/api/crm-department/save`, body)).data;
  }

  static async getAllDepartments(params: ParamsQuery) {
    return (await axios.get(`/api/crm-department/findall`, { params })).data;
  }
  static async getSource(id?: string) {
    return (await axios.get(`/api/crm-source/find/${id}`)).data;
  }

  static async deleteSource(id: string) {
    return (await axios.delete(`/api/crm-source/delete/${id}`)).data;
  }

  static async addSource(body: Source) {
    return (await axios.post(`/api/crm-source/save`, body)).data;
  }

  static async getAllSources(params: ParamsQuery) {
    return (await axios.get(`/api/crm-source/findall`, { params })).data;
  }
  static async getStatus(id?: string) {
    return (await axios.get(`/api/crm-status/find/${id}`)).data;
  }

  static async deleteStatus(id: string) {
    return (await axios.delete(`/api/crm-status/delete/${id}`)).data;
  }

  static async addStatus(body: Status) {
    return (await axios.post(`/api/crm-status/save`, body)).data;
  }

  static async getAllStatuses(params: ParamsQuery) {
    return (await axios.get(`/api/crm-status/findall`, { params })).data;
  }
  static async getTicketType(id?: string) {
    return (await axios.get(`/api/crm-ticket-types/find/${id}`)).data;
  }

  static async deleteTicketType(id: string) {
    return (await axios.delete(`/api/crm-ticket-types/delete/${id}`)).data;
  }

  static async addTicketType(body: TicketType) {
    return (await axios.post(`/api/crm-ticket-types/save`, body)).data;
  }

  static async getAllTicketTypes(params: ParamsQuery) {
    return (await axios.get(`/api/crm-ticket-types/findall`, { params })).data;
  }
  static async getTicket(id?: string) {
    return (await axios.get(`/api/crm-ticket/find/${id}`)).data;
  }

  static async deleteTicket(id: string) {
    return (await axios.delete(`/api/crm-ticket/delete/${id}`)).data;
  }

  static async addTicket(body: Ticket) {
    return (await axios.post(`/api/crm-ticket/save`, body)).data;
  }

  static async getAllTickets(params: ParamsQuery) {
    return (await axios.get(`/api/crm-ticket/findall`, { params })).data;
  }
  // API manager methods
  static async getTicketReason(id?: string) {
    return (await axios.get(`/api/ticket-reasons/find/${id}`)).data;
  }

  static async deleteTicketReason(id: string) {
    return (await axios.delete(`/api/ticket-reasons/${id}`)).data;
  }

  static async addTicketReason(body: TicketReason) {
    return (await axios.post(`/api/ticket-reasons`, body)).data;
  }

  static async getAllTicketReasons(params: ParamsQuery) {
    return (await axios.get(`/api/ticket-reasons`, { params })).data;
  }
  static async getAllEmployeesPoints(params: ParamsQuery) {
    return (await axios.get(`/admin/emp/points`, { params })).data;
  }
  static async getAllEmployees(params: ParamsQuery) {
    return (await axios.get(`/admin/employees`, { params })).data;
  }
}

export default SiteManager;
