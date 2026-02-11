/**
 * API Client
 */

import { API_BASE_URL } from './config';

const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

const getHeaders = (includeAuth: boolean = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

export const apiClient = {
  post: async <T>(endpoint: string, data: unknown, useAuth: boolean = false): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(useAuth),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      let errorMessage = errorData.message || 'حدث خطأ غير متوقع';
      
      if (response.status === 409) {
        errorMessage = 'البريد الإلكتروني مستخدم بالفعل';
      }

      throw new Error(errorMessage);
    }

    return response.json();
  },

  get: async <T>(endpoint: string, useAuth: boolean = true): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(useAuth),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'حدث خطأ غير متوقع');
    }

    return response.json();
  },

  patch: async <T>(endpoint: string, data: unknown, useAuth: boolean = true): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: getHeaders(useAuth),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'حدث خطأ غير متوقع');
    }

    return response.json();
  },
};
