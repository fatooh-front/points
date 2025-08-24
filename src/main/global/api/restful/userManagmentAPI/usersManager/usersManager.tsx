import { toQueryString } from "@/main/global/utils/queryUtils";
import {
  AddUser,
  UpdateUserLicense,
  UpdateUserPasswordType,
} from "./UsersTypes";
import axios from "axios";
import _ from "lodash";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class UsersManager {
  static async getAllUsers(params: ParamsQuery, StaticParams: string) {
    const { type, LeaveTheEndpointUnchanged, ...pureParams } = params;
    return (
      await axios.get(
        params?.type === "usersMyOrganization"
          ? `/user/myOrganization?${toQueryString(pureParams)}${StaticParams}`
          : `/user?${toQueryString(params)}${StaticParams}`
      )
    ).data;
  }

  static async getAllUsersLookUp(params: ParamsQuery) {
    return (await axios.get(`/lookup/user?${toQueryString(params)}`)).data;
  }

  static async getUser(id?: string) {
    return (await axios.get(`/user/${id}`)).data;
  }

  static async getProfile() {}

  static async getDefaultUser() {
    return (await axios.get(`/user/defaultUser`)).data;
  }

  static async addUser(
    body: AddUser,
    type: string,
    LeaveTheEndpointUnchanged: boolean = false
  ) {
    return (
      await axios.post(
        `/user/${LeaveTheEndpointUnchanged ? "" : "add"}${_.capitalize(type)}`,
        body
      )
    ).data;
  }

  static async updateUser(id?: string, body?: FormData) {
    return (await axios.patch(`/user/${id}/user`, body)).data;
  }

  static async updateUserPassword(id?: string, body?: UpdateUserPasswordType) {
    return (
      await axios.patch(
        `/user/${id === "myId" ? "password" : `${id}/password`}`,
        body
      )
    ).data;
  }

  static async updateUserLicense(
    id?: string,
    body?: Partial<UpdateUserLicense>
  ) {
    return (await axios.patch(`/user/${id}/license`, body)).data;
  }

  static async updateProfile(body: FormData) {
    return (await axios.patch(`/user`, body)).data;
  }

  static async deleteUser(id: string) {
    return (await axios.delete(`/user/${id}`)).data;
  }
}

export default UsersManager;
