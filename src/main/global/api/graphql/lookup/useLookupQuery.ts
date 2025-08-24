import { useGQLQuery } from "@/main/global/api/graphql/config/useGQLQuery";
import { GET_ALL_LOOKUP } from "./lookupManager";

export type LookupParams = {
  resource?: string;
  search?: string;
  sort?: string;
  filter?: string;
  page?: number;
  size?: number;
  model?: string;
} | null;

export const useGetAllLookUp = (
  params: LookupParams,
  enabled: boolean = true,
  license?: string
) => {
  return useGQLQuery<any>(
    ["lookup", params],
    GET_ALL_LOOKUP,
    { params },
    { enabled },
    {
      license,
    }
  );
};

export const useGetAllWorkflowsLookUp = (
  params: LookupParams,
  enabled: boolean = true,
  license?: string,
  orgs?: string[],
  companies?: string[]
) => {
  return useGQLQuery<any>(
    ["workflows", params, orgs, companies],
    GET_ALL_LOOKUP,
    { params },
    { enabled },
    {
      license,
      headers: {
        "x-organizations": orgs?.join(",") ?? "",
        "x-companies": companies?.join(",") ?? "",
      },
    }
  );
};

export const useGetAllModelsLookUp = (
  params: LookupParams,
  enabled: boolean = true,
  license?: string,
  orgs?: string[],
  companies?: string[]
) => {
  return useGQLQuery<any>(
    ["models", params, orgs, companies],
    GET_ALL_LOOKUP,
    { params },
    { enabled },
    {
      license,
      headers: {
        "x-organizations": orgs?.join(",") ?? "",
        "x-companies": companies?.join(",") ?? "",
      },
    }
  );
};
