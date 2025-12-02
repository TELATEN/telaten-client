import { User } from "..";

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
  user: User;
}
