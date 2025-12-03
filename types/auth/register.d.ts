export interface RegisterParams {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
  access_token: string;
}
