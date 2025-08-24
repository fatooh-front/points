// Type for the language messages
export type LanguageMessages = {
  [key in "en" | "ar"]: {
    defaultTitle: string;
    genericErrorMessage: string;
    noResponseMessage: string;
    notAllowedMessage: string;
  };
};

export enum HttpMethodMudation {
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}
