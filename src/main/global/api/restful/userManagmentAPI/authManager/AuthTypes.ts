export type LoginAuth = {
  sendValues: {
    phone?: string;
    phoneCode?: string;
    email?: string;
    password?: string;
    license?: string;
  };
  type: string;
};

export type RegisterAuth = {
  sendValues: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    phoneCode?: string;
    password?: string;
    passwordConfirm?: string;
    country?: string;
    license?: string;
  };
  type: string;
};

export type AddRegisterAuth = {
  sendValues: FormData;
  type: string;
  userType: string;
};

export type ActivatePhoneAuth = {
  otp?: string;
};

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

export type ReSendActivateState = {
  message: string;
};

export type SetNewPasswordAuth = {
  sendValues: {
    token?: string;
    otp?: string;
    phone?: string;
    phoneCode?: string;
    email?: string;
    password?: string;
    license?: string;
    type?: string;
  };
  type: string;
};

export type AuthState = {
  message: string | null;
  data: AuthUser;
};

export type AuthActions = {
  setToken: (token: string) => void;
  setMessage: (message: string) => void;
  setUser: (user: AuthUser) => void;
  logout: () => void;
  setLoginData: (data: AuthState) => void;
};
