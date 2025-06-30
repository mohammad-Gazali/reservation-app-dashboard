export interface Admin {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string | null;
  adminname: string;
  email: string;
  password?: string;
  fingerprint?: string;
  remember_token?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RegisterAdminRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  fingerprint?: string | null;
  avatar?: File | null;
}

export interface LoginAdminRequest {
  email: string;
  password: string | null;
  fingerprint: string | null;
}

export interface RegisterAdminResponse {
  success: boolean;
  admin: Admin;
  token: string;
}

export interface LoginAdminResponse {
  success: boolean;
  user: Admin;
  token: string;
}

export interface LogoutAdminResponse {
  success: boolean;
  message: string;
}

export interface GetAdminResponse {
  image: string | null;
  admin: Admin;
}