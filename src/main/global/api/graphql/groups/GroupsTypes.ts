import { User } from "../users/UsersTypes";

//GroupsTypes.ts
export type Group = {
  id: number;
  object_id?: string;
  name?: string;
  description?: string;
  active?: boolean;
  removed?: boolean;
  created_at?: string; // ISO 8601 date string
  updated_at?: string; // ISO 8601 date string
  users?: User[];
  test_profiles?: any[];
};

export type AllGroupsData = {
  groups?: {
    data?: Group[];
    total?: number;
    maxDepth?: number;
    page?: number;
    size?: number;
    totalPages?: number;
  };
};

export type GroupLookup = {
  id: number;
  name?: string;
  name_en?: string;
  name_ar?: string;
  properties?: string;
  active?: boolean;
};
export type AllGroupsLookupData = {
  lookupData: { data: GroupLookup[] };
};

export type GroupData = {
  group?: Group;
};

export type GroupVariables = {
  id: number;
};

export type GroupByNameVariables = {
  name: string;
};

export type AddGroupVariables = {
  [key: string]: any;
};

export type UpdateGroupVariables = {
  id: number;
  [key: string]: any;
};

export type DeleteGroupVariables = {
  id: number;
};
