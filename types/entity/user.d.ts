export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: Date;
  role: UserRole;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  created_at: string;
}
