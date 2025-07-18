export interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminAuthResponse {
  token: string;
  admin: {
    id: number;
    name: string;
    email: string;
  };
}