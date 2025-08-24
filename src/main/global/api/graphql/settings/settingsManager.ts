//settingsManager.ts
import { gql } from "graphql-tag";

// GraphQL queries and mutations
export const GET_ALL_SETTINGS = gql`
  query GetAllSettings {
    settings {
      id
      name
      value
    }
  }
`;

export const GET_SETTING = gql`
  query GetSetting($id: ID!) {
    setting(id: $id) {
      id
      name
      value
    }
  }
`;

export const GET_SETTING_BY_NAME = gql`
  query GetSettingByName($name: String!) {
    settingByName(name: $name) {
      id
      name
      value
    }
  }
`;

export const ADD_SETTING = gql`
  mutation AddSetting($name: String!, $value: String!) {
    addSetting(name: $name, value: $value) {
      id
      name
      value
    }
  }
`;

export const UPDATE_SETTING = gql`
  mutation UpdateSetting($id: ID!, $name: String, $value: String) {
    updateSetting(id: $id, name: $name, value: $value) {
      id
      name
      value
    }
  }
`;

export const DELETE_SETTING = gql`
  mutation DeleteSetting($id: ID!) {
    deleteSetting(id: $id) {
      id
    }
  }
`;
