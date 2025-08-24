export type AuthUser = {
  bearerToken: string;
  branchId: string | number | null;
  picture: string | null;
  callCenterId: string | number | null;
  email: string;
  fullName: string;
  mobile: string;
  notes: string | null;
  password: string | null;
  reports: string | number;
  role: string | number;
  systemId: string | number | null;
  userId: string | number;
  username: string;
};

export type AuthState = {
  token: string | null;
  message: string | null;
  user: AuthUser | null;
};

export type AuthActions = {
  setToken: (token: string) => void;
  setMessage: (message: string) => void;
  setUser: (user: AuthUser) => void;
  logout: () => void;
  setLoginData: (data: AuthState) => void;
};
