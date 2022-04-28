export interface Auth {
  username: string,
  password: string
}

export interface AuthResponse {
  id: number | string;
  username: string;
  email: string;
  exp?: number;
  iat?: number;
}