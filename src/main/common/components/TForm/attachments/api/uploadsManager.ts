import { gql } from "graphql-tag";

export const MULTIPLE_UPLOAD = gql`
  mutation MultipleUpload($files: [Upload]!) {
    multipleUpload(files: $files) {
      name
      unique_name
      mime_type
      size
      url
    }
  }
`;
