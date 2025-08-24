import { RequestDocument } from "graphql-request";

import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

import { HttpMethodMudation } from "../../shared/ApiTypes";
import { handleSuccessToast } from "../../shared/ApiUtils";
import { gqlRequest } from "./graphqlClient";

type GQLRequestConfig = {
  license?: string;
  headers?: Record<string, string>;
};

// Custom hook for GraphQL mutations with specific toast notifications
export function useGQLMutation<
  TData = unknown,
  TVariables extends object = object
>(
  mutation: RequestDocument,
  operation: HttpMethodMudation,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">,
  config?: GQLRequestConfig
): UseMutationResult<TData, Error, TVariables> {
  const mutationFn = async (variables: TVariables): Promise<TData> => {
    console.log("variables1:", variables);
    const data = await gqlRequest<TData>(mutation, variables, config);
    handleSuccessToast(operation);
    return data;
  };

  return useMutation<TData, Error, TVariables>({
    mutationFn,
    ...options,
  });
}
