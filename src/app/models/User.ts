export interface User {
  id:       number;
  username: string;
  role:     'USER' | 'ADMIN';
}

export interface AuthResponse {
  token:    string;
  username: string;
  role:     'USER' | 'ADMIN';
  id:       number;
}
