//groupsManager.ts
import { gql } from "graphql-tag";

export const GET_ALL_GROUPS = gql`
  query Groups($params: Param) {
    groups(params: $params) {
      total
      maxDepth
      page
      size
      totalPages
      data {
        id
        object_id
        firstName
        lastName
        email
        phoneCode
        phone
        active
        removed
        created_at
        updated_at
        # test_profiles
      }
    }
  }
`;

export const GET_GROUP = gql`
  query Group($id: Int!) {
    group(id: $id) {
      id
      object_id
      firstName
      lastName
      email
      phoneCode
      phone
      active
      removed
      created_at
      updated_at
      # test_profiles
    }
  }
`;

export const GET_GROUP_BY_NAME = gql`
  query Group($name: String!) {
    group(name: $name) {
      id
      object_id
      firstName
      lastName
      email
      phoneCode
      phone
      active
      removed
      created_at
      updated_at
      # test_profiles
    }
  }
`;

export const ADD_GROUP = gql`
  mutation createGroup($id: Int!) {
    createGroup(data: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroup($id: Int!) {
    updateGroup(data: { id: $id }) {
      id
    }
  }
`;

export const DELETE_GROUP = gql`
  mutation DeleteGroup($id: Int!) {
    deleteGroup(id: $id)
  }
`;
