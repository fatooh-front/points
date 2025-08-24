export type AddMultipleUploadVariables = { files: File[] };

export type MultipleUpload = {
  name?: string;
  unique_name?: string;
  mime_type?: string;
  size?: number;
  url?: string;
};
