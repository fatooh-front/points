//attachmentsManager.ts
import { gql } from "graphql-tag";

export const GET_ALL_ATTACHMENTS = gql`
  query Attachments($params: Param) {
    attachments(params: $params) {
      total
      maxDepth
      page
      size
      totalPages
      data {
        id
        name
        unique_name
        size
        mime_type
        description
        created_at
        updated_at
        test_method_id
        procedure_id
        instrument_id
        control_sample_id
        url
        # test_method
        # procedure
        # instrument
      }
    }
  }
`;

export const GET_ATTACHMENT = gql`
  query Attachment($id: Int!) {
    attachment(id: $id) {
      id
      name
      unique_name
      size
      mime_type
      description
      created_at
      updated_at
      test_method_id
      procedure_id
      instrument_id
      control_sample_id
      url
      # test_method
      # procedure
      # instrument
    }
  }
`;

export const GET_ATTACHMENT_BY_NAME = gql`
  query Attachment($name: String!) {
    attachment(name: $name) {
      id
      name
      unique_name
      size
      mime_type
      description
      created_at
      updated_at
      test_method_id
      procedure_id
      instrument_id
      control_sample_id
      url
      # test_method
      # procedure
      # instrument
    }
  }
`;

export const ADD_ATTACHMENT = gql`
  mutation createAttachment($name: String, $unique_name: String!, $size: Int, $mime_type: String, $description: String, $test_method_id: Int, $procedure_id: Int, $instrument_id: Int, $control_sample_id: Int) {
    createAttachment(data: { name: $name, unique_name: $unique_name, size: $size, mime_type: $mime_type, description: $description, test_method_id: $test_method_id, procedure_id: $procedure_id, instrument_id: $instrument_id, control_sample_id: $control_sample_id }) {
      id
    }
  }
`;

export const UPDATE_ATTACHMENT = gql`
  mutation updateAttachment($id: Int!, $name: String, $unique_name: String!, $size: Int, $mime_type: String, $description: String, $test_method_id: Int, $procedure_id: Int, $instrument_id: Int, $control_sample_id: Int) {
    updateAttachment(data: { id: $id, name: $name, unique_name: $unique_name, size: $size, mime_type: $mime_type, description: $description, test_method_id: $test_method_id, procedure_id: $procedure_id, instrument_id: $instrument_id, control_sample_id: $control_sample_id }) {
      id
    }
  }
`;

export const DELETE_ATTACHMENT = gql`
  mutation DeleteAttachment($id: Int!) {
    deleteAttachment(id: $id)
  }
`;
