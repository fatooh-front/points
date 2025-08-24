export interface UploadedFile extends File {
  preview?: string;
  displayName?: string;
}

export interface AttachmentsProps {
  form: any;
  name?: string;
  disabled?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  allowedTypes?: string[];
  type?: string;
  readOnly?: boolean;
  isFromData?: boolean;
  FieldNotFileKay?: (index: number) => string;
}
