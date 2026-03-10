export interface AdminUser {
  id?: number;
  name?: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}

export interface SignupResponse {
  message: string;
  user?: AdminUser;
}