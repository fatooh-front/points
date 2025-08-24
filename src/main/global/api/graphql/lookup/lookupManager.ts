import { gql } from "graphql-tag";

export const GET_ALL_LOOKUP = gql`
  query lookupData($params: lookupParams!) {
    lookupData(params: $params)
  }
`;