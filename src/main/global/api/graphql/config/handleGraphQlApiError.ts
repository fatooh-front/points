import { useAuth } from "@/main/global/store/auth/useAuth";
import { messages } from "../../shared/apiMessages";
import { displayToast, messageApiInLang } from "../../shared/ApiUtils";

// export type ErrorResponseData = {
//   detailedMessage?: string;
//   message?: string;
//   status?: string;
//   status?: number;
//   statusMessage?: string;
// };

export const handleGraphQlApiError = (error: any, config: any, status: any) => {
  console.log("Error1", error?.response);

  const skipErrorToast = config?.skipErrorToast;
  console.log("error1", error);

  // Skip toast if skipErrorToast is true or if it's an array containing the current status code
  if (
    skipErrorToast === true ||
    (Array.isArray(skipErrorToast) &&
      status &&
      skipErrorToast?.includes(status))
  ) {
    return;
  }
  const language = (localStorage.getItem("i18nextLng") as "en" | "ar") || "en";
  const {
    defaultTitle,
    genericErrorMessage,
    noResponseMessage,
    notAllowedMessage,
  } = messages[language];

  if (error?.response) {
    if (status === 401 && window.location.pathname !== "/auth/login") {
      console.log("Unauthorized");
      useAuth.getState().logout();
      // Redirect to login page
      location.replace(`/auth/login`);
      return;
    }

    if (status === 403 && window.location.pathname !== "/") {
      console.log("Unauthorized not allowed Permission");
      displayToast(
        "destructive",
        defaultTitle,
        notAllowedMessage || "Unauthorized"
      );
      return;
    }
    const errorMessage = messageApiInLang(
      error?.response?.errors?.[0]?.message
    );
    displayToast("destructive", defaultTitle, errorMessage || "");
  } else if (error?.request) {
    console.log("Error2", error?.request);
    displayToast("destructive", defaultTitle, noResponseMessage);
  } else if (error?.message) {
    console.log("Error3", error?.message);
    displayToast("destructive", defaultTitle, genericErrorMessage);
  } else {
    console.log("Error4", error);
    displayToast("destructive", defaultTitle, error);
    // console.error("Error", error);
  }
};
