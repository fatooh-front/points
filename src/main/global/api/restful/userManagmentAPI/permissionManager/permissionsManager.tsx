import { toQueryString } from "@/main/global/utils/queryUtils";
import { UpdatePermission } from "./PermissionsTypes";
import axios from "axios";
import { CustomInternalAxiosRequestConfig } from "../../config/axiosSetup";
import { ParamsQuery } from "@/main/global/types/CommonTypes";

class PermissionsManager {
  static async getAllPermissions(params: ParamsQuery) {
    return (await axios.get(`/permission?${toQueryString(params)}`)).data;
  }

  // static async getAllPermissionsLookUp(params: ParamsQuery) {
  //   return (await axios.get(`/lookup/permission?${toQueryString(params)}`))
  //     .data;
  // }

  static async getPermission(id: string | undefined) {
    return id && (await axios.get(`/permission/${id}`)).data;
  }

  static async getMyPermission() {}

  static async getPermissionUserGroup(
    id?: string,
    type?: string,
    license?: string
  ) {
    return (
      id &&
      license &&
      (
        await axios.get(
          `/${license}Permission/${
            id === "default" ? "default" : `${id}/${type}`
          }`,
          {
            // skipErrorToast: true,
            skipErrorToast: [400],
          } as CustomInternalAxiosRequestConfig
        )
      ).data
    );
  }

  static async updatePermission(
    id: string | undefined,
    body: Partial<UpdatePermission>,
    license?: string
  ) {
    return (
      id &&
      license &&
      (await axios.patch(`/${license}Permission/${id}`, body)).data
    );
  }
}

export default PermissionsManager;
