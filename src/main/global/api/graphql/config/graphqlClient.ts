// graphqlClient.ts
import { GraphQLClient, RequestDocument } from "graphql-request";

import i18n from "@/i18n";

import { getLangHeader } from "../../shared/ApiUtils";
import { handleGraphQlApiError } from "./handleGraphQlApiError";

const defaultClient = new GraphQLClient(
  import.meta.env.VITE_API_ROOT_LIMS as string,
  {
    headers: {
      lang: getLangHeader(i18n, "ar", "en"),
    },
  }
);

const clientLims = new GraphQLClient(
  import.meta.env.VITE_API_ROOT_LIMS as string,
  {
    headers: {
      lang: getLangHeader(i18n, "ar", "en"),
    },
  }
);

const clientInventory = new GraphQLClient(
  import.meta.env.VITE_API_ROOT_INVENTORY as string,
  {
    headers: {
      lang: getLangHeader(i18n),
    },
  }
);

// Add token to headers if available
export const addAuthHeader = ({ client }: { client: GraphQLClient }) => {
  const token = JSON.parse(localStorage.getItem("useAuthStorage") ?? "{}")
    ?.state?.token;
  if (token) {
    client.setHeader("Authorization", `Bearer ${token}`);
  }
  // const orgs = JSON.parse(
  //   localStorage.getItem("select-org-or-company") ?? "{}"
  // )?.state?.org_id;
  // const companies = JSON.parse(
  //   localStorage.getItem("select-org-or-company") ?? "{}"
  // )?.state?.company_id;
  // client.setHeader("x-organizations", orgs);
  // client.setHeader("x-companies", companies);
};

// Centralized function to perform GraphQL requests with global handling
export const gqlRequest = async <TData>(
  query: RequestDocument,
  variables?: object,
  config?: { license?: string; headers?: Record<string, string> }
): Promise<TData> => {
  let client;

  switch (config?.license) {
    case "lims":
      client = clientLims;
      break;
    case "inventory":
      client = clientInventory;
      break;
    default:
      client = defaultClient;
  }

  try {
    addAuthHeader({ client });

    // Add custom headers if provided
    if (config?.headers) {
      Object.entries(config.headers).forEach(([key, value]) => {
        client.setHeader(key, value);
      });
    }

    const data = await client.request<TData>(query, variables);
    return data;
  } catch (error: any) {
    const reqRes = error && JSON.parse(JSON.stringify(error));
    const status = reqRes?.response?.status;
    handleGraphQlApiError(error, config, status);
    throw error;
  }
};

