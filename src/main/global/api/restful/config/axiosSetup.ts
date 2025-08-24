import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { toast } from "@/components/ui/use-toast";

import { HttpMethodMudation } from "../../shared/ApiTypes";
import { handleSuccessToast } from "../../shared/ApiUtils";
import { handleAxiosApiError } from "./handleAxiosApiError";
import i18n from "@/i18n";

// Extend InternalAxiosRequestConfig to include our custom type
export interface CustomInternalAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  skipErrorToast?: boolean | number[];
  skipSuccessToast?: boolean;
  customToastMessage?: string;
}

//  Set the base URL for Axios
axios.defaults.baseURL = import.meta.env.VITE_API_ROOT;

// Axios response interceptor to handle errors and success toasts
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response, "tsettttttttttttttttttt");

    const config = response.config as CustomInternalAxiosRequestConfig;
    if (!config.skipSuccessToast) {
      const customToastMessage = config.customToastMessage;
      if (customToastMessage) {
        toast({ title: customToastMessage });
      } else {
        const method = response.config.method as HttpMethodMudation;
        if (["post", "put", "delete", "patch"].includes(method)) {
          handleSuccessToast(method, config);
        }
      }
    }
    return response;
  },
  (error: AxiosError) => {
    console.log(error, "tsetttttttttttttssstttttt");

    handleAxiosApiError(
      error,
      error?.config as CustomInternalAxiosRequestConfig
    );
    return Promise.reject(error);
  }
);

// Axios request interceptor to add token to headers
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const customConfig = config as CustomInternalAxiosRequestConfig;
    const token = JSON.parse(localStorage.getItem("useAuthStorage") || "{}")
      ?.state?.token;
    if (token && !customConfig.headers?.skipAuth) {
      customConfig.headers = customConfig.headers || {};
      customConfig.headers.Authorization = `Bearer ${token}`;
      customConfig.headers.lang = i18n.language;
    }
    if (customConfig.headers?.skipAuth) {
      delete customConfig?.headers?.skipAuth;
    }
    return customConfig;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axios;
