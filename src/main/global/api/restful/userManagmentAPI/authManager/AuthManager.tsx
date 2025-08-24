import {
  ActivatePhoneAuth,
  AddRegisterAuth,
  AuthState,
  LoginAuth,
  RegisterAuth,
  ReSendActivateState,
  SetNewPasswordAuth,
} from "./AuthTypes";
import axios, { AxiosResponse } from "axios";
import _ from "lodash";

class AuthManager {
  static async login(body: LoginAuth): Promise<AuthState> {
    return (await axios.post(`/auth/admin/login`, body.sendValues)).data;
  }

  static async register(body: AddRegisterAuth): Promise<AuthState> {
    return (
      await axios.post(
        body.userType === "organization"
          ? `/organization`
          : `/auth/${body.type}Register`,
        body.sendValues
      )
    ).data;
  }

  static async activateEmail(token: string) {
    if (!token) return;
    return (await axios.post(`/auth/${token}/activateEmail`)).data;
  }

  static async activatePhone(body: ActivatePhoneAuth) {
    return (await axios.post(`/auth/activatePhone`, body)).data;
  }

  static async reSendActivate(
    body: RegisterAuth
  ): Promise<AxiosResponse<ReSendActivateState>> {
    return await axios.post(
      `/auth/admin/login
      }`,
      body.sendValues
    );
  }

  static async forgetPassword(body: LoginAuth): Promise<AuthState> {
    return (
      await axios.post(
        `/auth/forgetPassword${_.capitalize(body.type)}`,
        body.sendValues
      )
    ).data;
  }

  static async setNewPassword(body: SetNewPasswordAuth): Promise<AuthState> {
    const { type, token, ...pureValues } = body?.sendValues;
    return (
      await axios.post(
        `/auth${
          body?.type === "email" ? `/${token}` : ""
        }/resetPassword${_.capitalize(body.type)}`,
        pureValues
      )
    ).data;
  }
}

export default AuthManager;
