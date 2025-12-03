import { User } from "..";

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}
