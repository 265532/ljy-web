import { httpClient } from '../api/httpClient';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type?: string;
  detail?: string;
}

export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  role?: string;
}

export const authApi = {
  login: (data: LoginRequest) => {
    return httpClient.post<LoginResponse>('/auth/login', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      showLoading: true,
    });
  },

  logout: () => {
    localStorage.removeItem('access_token');
  },

  getCurrentUser: () => {
    return httpClient.get<UserInfo>('/auth/me', { showLoading: false });
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token');
  },

  getToken: (): string | null => {
    return localStorage.getItem('access_token');
  },

  getLoginBackground: async (): Promise<string> => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api';
    return `${baseUrl}/images/login-bg`;
  },
};