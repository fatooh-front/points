//usersManager.ts
import { gql } from "graphql-tag";

export const GET_ALL_USERS = gql`
  query Users($params: Param) {
    users(params: $params) {
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
        # groups
        # test_profiles
      }
    }
  }
`;

export const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
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
      # groups
      # test_profiles
    }
  }
`;

export const GET_USER_BY_NAME = gql`
  query User($name: String!) {
    user(name: $name) {
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
      # groups
      # test_profiles
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser($id: Int!) {
    createUser(data: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: Int!) {
    updateUser(data: { id: $id }) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`;
