// import { Instrument } from "@/main/layout/pages/(settings)/instruments/api/graphql/instruments/InstrumentsTypes";
// import { TestMethod } from "@/main/layout/pages/(testSetup)/testMethods/api/graphql/testMethods/TestMethodsTypes";
// import { Procedure } from "@/main/layout/pages/(testSetup)/tests/pages/testsFormPage/blocks/procedures/types/ProceduresTypes";

//AttachmentsTypes.ts
export type Attachment = {
  id: number;
  name?: string;
  unique_name?: string;
  size?: number;
  mime_type?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  test_method_id?: number;
  procedure_id?: number;
  instrument_id?: number;
  url?: string;
  // test_method?: TestMethod;
  // procedure?: Procedure;
  // instrument?: Instrument;
  [key: string]: any;
};

export type AllAttachmentsData = {
  attachments?: {
    data?: Attachment[];
    total?: number;
    maxDepth?: number;
    page?: number;
    size?: number;
    totalPages?: number;
  };
};

export type AttachmentLookup = {
  id?: number;
  name_en?: string;
  name_ar?: string;
  properties?: string;
};
export type AllAttachmentsLookupData = {
  lookupAttachments: AttachmentLookup[];
};

export type AttachmentData = {
  attachment?: Attachment;
};

export type AttachmentVariables = {
  id: number;
};

export type AttachmentByNameVariables = {
  name: string;
};

export type AddAttachmentVariables = {
  name?: string;
  unique_name: string;
  size?: number;
  mime_type?: string;
  description?: string;
  test_method_id?: number;
  procedure_id?: number;
  instrument_id?: number;
};

export type UpdateAttachmentVariables = {
  id: number;
  name?: string;
  unique_name?: string;
  size?: number;
  mime_type?: string;
  description?: string;
  test_method_id?: number;
  procedure_id?: number;
  instrument_id?: number;
};

export type DeleteAttachmentVariables = {
  id: number;
};
