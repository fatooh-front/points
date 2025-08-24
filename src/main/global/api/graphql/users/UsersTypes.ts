//UsersTypes.ts
export type User = {
  id?: number;
  object_id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneCode?: string;
  phone?: string;
  active?: boolean;
  removed?: boolean;
  created_at?: string;
  updated_at?: string;
  groups?: any;
  test_profiles?: any;
};

export type AllUsersData = {
  users?: {
    data?: User[];
    total?: number;
    maxDepth?: number;
    page?: number;
    size?: number;
    totalPages?: number;
  };
};

export type UserLookup = {
  id: number;
  name?: string;
  name_en?: string;
  name_ar?: string;
  firstName?: string;
  lastName?: string;
  properties?: string;
  active?: boolean;
};
export type AllUsersLookupData = {
  lookupData: { data: UserLookup[] };
};

export type UserData = {
  user?: User;
};

export type UserVariables = {
  id: number;
};

export type UserByNameVariables = {
  name: string;
};

export type AddUserVariables = {
  [key: string]: any;
};

export type UpdateUserVariables = {
  id: number;
  [key: string]: any;
};

export type DeleteUserVariables = {
  id: number;
};
