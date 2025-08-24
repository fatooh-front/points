import { RequestDocument } from "graphql-request";

// useGQLQuery.ts
import { keepPreviousData, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { gqlRequest } from "./graphqlClient";

// Reusable hook for GraphQL queries with error handling and toast notifications
export const useGQLQuery = <TData = unknown, TVariables extends object = object>(key: QueryKey, query: RequestDocument, variables?: TVariables, options?: Omit<UseQueryOptions<TData, Error>, "queryKey" | "queryFn">, config?: any): UseQueryResult<TData, Error> => {
  // console.log("Executing query:", key, query, variables); // Debugging log

  const fetchData = async (): Promise<TData> => {
    console.log("Fetching data..."); // Debugging log
    return gqlRequest<TData>(query, variables, config);
  };

  return useQuery<TData, Error>({
    queryKey: key,
    queryFn: fetchData,
    retry: false,
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    ...options,
  });
};
