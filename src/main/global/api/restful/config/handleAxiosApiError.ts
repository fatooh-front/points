import { useAuth } from "@/main/global/store/auth/useAuth";
import { messages } from "../../shared/apiMessages";
import { displayToast } from "../../shared/ApiUtils";
import ARError from "./locales/ar/ApiError..json";
import ENError from "./locales/en/ApiError..json";
export type ErrorResponseData = { status: string; message: string };

export const handleAxiosApiError = (error: any, config: any) => {
  // const { t } = useTranslation("ApiError");
  const skipErrorToast = config?.skipErrorToast;
  const statusCode = error?.response?.status;
  const RequestMethod = error?.config?.method;

  // Skip toast if skipErrorToast is true or if it's an array containing the current status code
  if (
    skipErrorToast === true ||
    (Array.isArray(skipErrorToast) &&
      statusCode &&
      skipErrorToast?.includes(statusCode))
  ) {
    return;
  }

  const language = (localStorage.getItem("i18nextLng") as "en" | "ar") || "en";
  const { defaultTitle, genericErrorMessage, noResponseMessage } =
    messages[language];

  if (error.response) {
    if (statusCode === 401 && window.location.pathname !== "/auth/login") {
      console.log("Unauthorized");
      useAuth.getState().logout();
      // Redirect to login page
      location.replace(`/auth/login`);
      return;
    }
    const mainMessage =
      Object.values(error?.response?.data)?.[0] ||
      error?.response?.data?.message;
    const errorMessage =
      (language === "en"
        ? ENError[mainMessage as keyof typeof ENError]
        : ARError[mainMessage as keyof typeof ARError]) || mainMessage;

    if (RequestMethod === "delete") {
      displayToast("destructive", defaultTitle, "لا يمكن حذف هذا الحقل");
      return;
    }
    displayToast("destructive", defaultTitle, errorMessage || "");
  } else if (error?.request) {
    displayToast("destructive", defaultTitle, noResponseMessage);
    console.log("Error", error?.request);
  } else {
    displayToast("destructive", defaultTitle, genericErrorMessage);
    console.error("Error", error?.message);
  }
};
